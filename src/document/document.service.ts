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

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: string) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: string) {
    return this.prisma.document.delete({ where: { id } });
  }
}
