import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}
  async create(createDocumentDto: CreateDocumentDto) {
    try {
      return await this.prisma.document.create({ data: createDocumentDto });
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async findAll() {
    return this.prisma.document.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.document.findUnique({ where: { id } });
    } catch (error) {
      return new HttpException(error, 500);
    }
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  async remove(id: string) {
    try {
      const document = await this.prisma.document.delete({ where: { id } });
      if (document) {
        return { success: true };
      } else {
        return { success: false, message: 'This document does not exist' };
      }
    } catch (error) {
      return new HttpException(error, 500);
    }
  }
}
