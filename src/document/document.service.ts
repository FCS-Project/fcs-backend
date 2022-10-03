import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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
      if ((error.code = 'P2002')) {
        throw new BadRequestException(
          'A user with these credentials already exists!',
        );
      } else {
        throw new HttpException(error, 500);
      }
    }
  }

  async findAll() {
    return await this.prisma.document.findMany();
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
      return await this.prisma.document.delete({ where: { id } });
    } catch (error) {
      return new HttpException(error, 500);
    }
  }
}
