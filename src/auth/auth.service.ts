/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload, Tokens } from './types';
import { Role, Type } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { OtpSignInDto } from './dto/otpSignIn.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { SignUpDto } from './dto/signUp.dto';

const nodemailer = require('nodemailer');
const saltRounds = 12;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async updateRtHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, saltRounds);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(
    userId: string,
    email: string,
    roles: Role[],
    type: Type[],
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      roles: roles,
      type: type,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.AT_SECRET,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.RT_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    try {
      if (signInDto.email != '') {
        const user = await this.prisma.user.findUnique({
          where: { email: signInDto.email },
        });
        if (user) {
          const result = await bcrypt.compare(
            signInDto.password,
            user.password,
          );
          if (result) {
            const tokens = await this.getTokens(
              user.id,
              user.email,
              user.roles,
              user.type,
            );
            await this.updateRtHash(user.id, tokens.refresh_token);
            return tokens;
          } else {
            throw new BadRequestException('Invalid User Credentials!');
          }
        } else {
          throw new BadRequestException('User does not exist!');
        }
      } else {
        const user = await this.prisma.user.findUnique({
          where: { mobileNumber: signInDto.mobileNumber },
        });
        if (user) {
          const result = await bcrypt.compare(
            signInDto.password,
            user.password,
          );
          if (result) {
            const tokens = await this.getTokens(
              user.id,
              user.email,
              user.roles,
              user.type,
            );
            await this.updateRtHash(user.id, tokens.refresh_token);
            return tokens;
          } else {
            throw new BadRequestException('Invalid User Credentials!');
          }
        } else {
          throw new BadRequestException('User does not exist!');
        }
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<Tokens> {
    try {
      const hash = await bcrypt.hash(signUpDto.password, saltRounds);
      signUpDto.password = hash;
      const user = await this.prisma.user.create({
        data: signUpDto,
      });
      const tokens = await this.getTokens(
        user.id,
        user.email,
        user.roles,
        user.type,
      );
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'A user with this email address already exists!',
        );
      } else {
        throw new HttpException(error, 500);
      }
    }
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: { not: null },
      },
      data: {
        hashedRt: null,
      },
    });
    return { success: true };
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied.');
    }
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied.');
    }
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.roles,
      user.type,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async otpSignIn(otpSignInDto: OtpSignInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: otpSignInDto.email },
      });
      if (user) {
        const otp = Math.floor(Math.random() * 1000000 + 1).toString();
        const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: process.env.OUTLOOK_MAIL,
            pass: process.env.OUTLOOK_PASS,
          },
        });
        const mailOptions = {
          from: process.env.OUTLOOK_MAIL,
          to: user.email,
          subject: 'VamaCare: One Time Password',
          text: `${otp} is your One Time Password(OTP) for VamaCare.`,
        };
        await transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        const hashedOtp = await bcrypt.hash(otp, saltRounds);
        const dateTime = new Date();
        await this.prisma.user.update({
          where: { id: user.id },
          data: { otp: hashedOtp, otpCreatedAt: dateTime },
        });
        return {
          success: true,
        };
      } else {
        throw new BadRequestException(
          'User with this mobile number does not exist!',
        );
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: verifyOtpDto.email,
        },
      });
      const result = await bcrypt.compare(verifyOtpDto.otp, user.otp);
      if (verifyOtpDto.editInfo && result) {
        await this.prisma.user.updateMany({
          where: {
            id: user.id,
            otp: { not: null },
          },
          data: {
            otp: null,
            otpCreatedAt: null,
          },
        });
        return {
          success: true,
        };
      }
      if (result) {
        const tokens = await this.getTokens(
          user.id,
          user.email,
          user.roles,
          user.type,
        );
        await this.updateRtHash(user.id, tokens.refresh_token);
        await this.prisma.user.updateMany({
          where: {
            id: user.id,
            otp: { not: null },
          },
          data: {
            otp: null,
            otpCreatedAt: null,
          },
        });
        return tokens;
      } else {
        throw new BadRequestException('Invalid Otp!');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
