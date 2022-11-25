import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        success: boolean;
        data: import(".prisma/client").Order;
        razorpayData: import("razorpay-typescript/dist/resources/order").IRazorOrderId;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        success: boolean;
    }>;
    remove(id: number): string;
}
