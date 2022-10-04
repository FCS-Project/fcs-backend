import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(signInDto: SignInDto) {
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
          return { success: false, message: 'Invalid User Credentials!' };
        }
      } else {
        return {
          success: false,
          message: `User with mobile number '${signInDto.mobileNumber}' does not exist!`,
        };
      }
    }
  }
}
