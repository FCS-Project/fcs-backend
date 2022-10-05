import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (user) {
        return { success: true, data: user };
      } else {
        throw new BadRequestException('User does not exist!');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getUserDocuments(id: string) {
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

  async remove(id: string) {
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
  }
}
