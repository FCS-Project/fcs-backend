/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, Injectable } from '@nestjs/common';
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
      await this.prisma.order.create({ data: createOrderDto });
      return {
        success: true,
        data: order,
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
