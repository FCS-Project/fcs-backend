/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import * as fs from 'fs';
import * as path from 'path';
import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFHexString,
  PDFString,
  PDFArray,
} from 'pdf-lib';
import signer from 'node-signpdf';
import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';

const base64 = require('base64topdf');

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  @Public()
  async create(createDocumentDto: CreateDocumentDto) {
    try {
      console.log(createDocumentDto);
      // return await this.prisma.document.create({ data: createDocumentDto });
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
