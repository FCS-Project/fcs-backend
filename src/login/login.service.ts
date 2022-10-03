import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    if (loginDto.email) {
      const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
      });
      if (user) {
        const result = await bcrypt.compare(loginDto.password, user.password);
        if (result) {
          return { success: true, data: user };
        } else {
          return { success: false, message: 'Invalid User Credentials!' };
        }
      } else {
        return {
          success: false,
          message: `User with email address '${loginDto.email}' does not exist!`,
        };
      }
    }
    if (loginDto.mobileNumber) {
      const user = await this.prisma.user.findUnique({
        where: { mobileNumber: loginDto.mobileNumber },
      });
      if (user) {
        const result = await bcrypt.compare(loginDto.password, user.password);
        if (result) {
          return { success: true, data: user };
        } else {
          return { success: false, message: 'Invalid User Credentials!' };
        }
      } else {
        return {
          success: false,
          message: `User with mobile number '${loginDto.mobileNumber}' does not exist!`,
        };
      }
    }
  }
}
