import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string, role: string, userId: string) {
    if (role === 'Admin' || userId === id) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { id },
          select: {
            name: true,
            email: true,
            roles: true,
            type: true,
            Documents: true,
            createdAt: true,
          },
        });
        if (user) {
          return { success: true, data: user };
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

  async getUserDocuments(id: string, userId: string) {
    if (id === userId) {
      try {
        const docs = await this.prisma.document.findMany({
          where: { userId: id },
        });
        if (docs) {
          return { success: true, data: docs };
        }
      } catch (error) {
        throw new HttpException(error, 500);
      }
    } else {
      throw new BadRequestException('Access Denied');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedData = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return { success: true, data: updatedData };
    } catch (error) {
      throw new HttpException(error, 500);
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
        select: {
          name: true,
          mobileNumber: true,
          location: true,
          email: true,
          displaySrc: true,
          bannerSrc: true,
          type: true,
          roles: true,
          description: true,
        },
      });
      if (user.type[0] == 'Professional' || user.roles[0] == 'Organisation') {
        return {
          success: true,
          data: user,
        };
      } else {
        throw new BadRequestException('Access Denied.');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
