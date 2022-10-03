import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    const result = await bcrypt.compare(loginDto.password, user.password);
    if (result) {
      return { success: true, data: user };
    } else {
      return { success: false, message: 'Invalid User Credentials' };
    }
  }
}
