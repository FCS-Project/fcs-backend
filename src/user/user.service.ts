import { HttpException, Injectable } from '@nestjs/common';
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
      }
      return { success: false, message: 'User does not exist!' };
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
      return { success: false, message: 'User data could not be updated!' };
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      if (user) {
        return { success: true };
      }
    } catch (error) {
      if ((error.code = 'P2025')) {
        return { success: false, message: 'User does not exist!' };
      }
      throw new HttpException(error, 500);
    }
  }

  async getDocuments(id: string) {
    return await this.prisma.user.findMany({
      where: { id },
      include: { Documents: true },
    });
  }
}
