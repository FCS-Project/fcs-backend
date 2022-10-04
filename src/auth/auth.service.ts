import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const saltRounds = 12;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(signInDto: SignInDto) {
    if (signInDto.email) {
      const user = await this.prisma.user.findUnique({
        where: { email: signInDto.email },
      });
      if (user) {
        const result = await bcrypt.compare(signInDto.password, user.password);
        if (result) {
          return { success: true, data: user };
        } else {
          return { success: false, message: 'Invalid User Credentials!' };
        }
      } else {
        return {
          success: false,
          message: `User with email address '${signInDto.email}' does not exist!`,
        };
      }
    }
    if (signInDto.mobileNumber) {
      const user = await this.prisma.user.findUnique({
        where: { mobileNumber: signInDto.mobileNumber },
      });
      if (user) {
        const result = await bcrypt.compare(signInDto.password, user.password);
        if (result) {
          return { success: true, data: user };
        } else {
          throw new BadRequestException('Invalid User Credentials!');
        }
      } else {
        return {
          success: false,
          message: `User with mobile number '${signInDto.mobileNumber}' does not exist!`,
        };
      }
    }
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const hash = await bcrypt.hash(signUpDto.password, saltRounds);
      signUpDto.password = hash;
      const user = await this.prisma.user.create({ data: signUpDto });
      return { success: true, data: user };
    } catch (error) {
      if ((error.code = 'P2002')) {
        throw new BadRequestException(
          'A user with this email address already exists!',
        );
      } else {
        throw new HttpException(error, 500);
      }
    }
  }
}
