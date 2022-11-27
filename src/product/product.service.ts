import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, type: string) {
    try {
      if (type === 'Pharmacy') {
        await this.prisma.product.create({ data: createProductDto });
        return {
          success: true,
        };
      } else {
        throw new BadRequestException('Access Denied.');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          imgSrc: true,
          user: {
            select: {
              name: true,
              displaySrc: true,
            },
          },
        },
      });
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
