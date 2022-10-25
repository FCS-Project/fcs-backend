import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}
  async create(createDocumentDto: CreateDocumentDto) {
    try {
      return await this.prisma.document.create({ data: createDocumentDto });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    return this.prisma.document.findMany();
  }

  async findOne(id: string) {
    try {
      const document = await this.prisma.document.findUnique({ where: { id } });
      if (document) {
        return {
          success: true,
          data: document,
        };
      } else {
        throw new BadRequestException('Document does not exist!');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: string, userId: string) {
    try {
      const document = await this.prisma.document.findUnique({ where: { id } });
      if (document) {
        if (document.userId === userId) {
          await this.prisma.document.delete({ where: { id } });
          return { success: true };
        } else {
          return new BadRequestException('Access Denied');
        }
      } else {
        throw new BadRequestException('Document does not exist!');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
