import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt');
      if (user) {
        return {
          success: true,
          data: data,
        };
      } else {
        throw new BadRequestException('User does not exist');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: string, role: string, userId: string) {
    if (role === 'Admin' || userId === id) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { id },
        });
        const data = exclude(
          user,
          'password',
          'hashedRt',
          'otp',
          'otpCreatedAt',
        );
        if (user) {
          return { success: true, data: data };
        } else {
          throw new BadRequestException('User does not exist!');
        }
      } catch (error) {
        throw new HttpException(error, 500);
      }
    } else {
      throw new BadRequestException('Access Denied');
    }
  }

  async getUserDocuments(userId: string) {
    try {
      const docs = await this.prisma.document.findMany({
        where: { id: userId },
      });
      if (docs) {
        return { success: true, data: docs };
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, userId: string) {
    if (id === userId) {
      try {
        const updatedData = await this.prisma.user.update({
          where: { id },
          data: updateUserDto,
        });
        return { success: true, data: updatedData };
      } catch (error) {
        throw new HttpException(error, 500);
      }
    } else {
      throw new BadRequestException('Access Denied.');
    }
  }

  async remove(id: string, role: string) {
    if (role === 'Admin') {
      try {
        const user = await this.prisma.user.delete({ where: { id } });
        if (user) {
          return { success: true };
        }
      } catch (error) {
        if (error.code === 'P2025') {
          throw new BadRequestException('User does not exist!');
        }
        throw new HttpException(error, 500);
      }
    } else {
      throw new BadRequestException('Access Denied');
    }
  }

  async getProfile(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt');
      if (user.type[0] == 'Professional' || user.roles[0] == 'Organisation') {
        return {
          success: true,
          data: data,
        };
      } else {
        throw new BadRequestException('Access Denied.');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getHome() {
    try {
      const users = await this.prisma.user.findMany();
      const homeData = [];
      let len = 0;
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].type[0] === 'Professional' ||
          users[i].roles[0] === 'Organisation'
        ) {
          const user = exclude(
            users[i],
            'password',
            'hashedRt',
            'otp',
            'otpCreatedAt',
          );
          homeData[len] = user;
          len++;
          console.log(homeData);
        }
      }

      return {
        success: true,
        data: homeData,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
