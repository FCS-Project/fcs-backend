/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { signingPDF } from './utils/sign-pdf.util';

@Injectable()
export class DocumentService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto, userId: string) {
    try {
      await signingPDF(createDocumentDto.dataURI);
      const pdfSrc = await this.uploadImage();
      const data = {
        userId: userId,
        sharedWith: createDocumentDto.sharedWith,
        dataSrc: pdfSrc,
        name: createDocumentDto.name,
      };
      await this.prisma.document.create({ data: data });
      return {
        success: true,
      };
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
  async uploadImage() {
    const pdf2base64 = require('pdf-to-base64');
    const formData = new FormData();
    const file = await pdf2base64(
      'src/document/test_assets/exported_file.pdf',
    ).then((response: any) => {
      return response;
    });
    formData.append('file', 'data:application/pdf;base64,' + file);
    formData.append('upload_preset', 'my-uploads');
    const responseData: any = await firstValueFrom(
      this.httpService
        .post(
          'https://api.cloudinary.com/v1_1/simply-sites1/image/upload',
          formData,
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          },
        )
        .pipe(map((response) => [response.data, response.status])),
    );
    return responseData[0].secure_url;
  }

  async getSharedDocs(userId: string) {
    try {
      const sharedDocs = await this.prisma.document.findMany({
        where: { sharedWith: userId },
        select: {
          user: {
            select: {
              name: true,
              displaySrc: true,
            },
          },
        },
      });
      return {
        success: true,
        data: sharedDocs,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
