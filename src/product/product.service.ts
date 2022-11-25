import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll() {
    try {
      const data = this.prisma.product.findMany();
      if (data) {
        return {
          success: true,
          data: data,
        };
      } else {
        throw new BadRequestException('No Products');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  findOne(id: string) {
    return `${id}`;
  }

  remove(id: string) {
    return `${id}`;
  }
}
