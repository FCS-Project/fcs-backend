/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Razorpay } from 'razorpay-typescript';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const instance = new Razorpay({
        authKey: {
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        },
      });
      const options = {
        amount: parseInt(createOrderDto.amount),
        currency: 'INR',
      };
      const order = await instance.orders.create(options);
      const data = await this.prisma.order.create({ data: createOrderDto });
      return {
        success: true,
        data: data,
        razorpayData: order,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.prisma.order.findUnique({ where: { id } });
      if (order) {
        await this.prisma.order.update({ where: { id }, data: updateOrderDto });
        return {
          success: true,
        };
      } else {
        throw new BadRequestException('Invalid Order ID!');
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
