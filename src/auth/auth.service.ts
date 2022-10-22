import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

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

  async getTokens(userId: string, email: string, roles: Role[]) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
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
      const tokens = await this.getTokens(user.id, user.email, user.roles);
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
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
