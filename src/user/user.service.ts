import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
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
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
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
