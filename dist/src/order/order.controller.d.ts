import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        success: boolean;
        data: import(".prisma/client").Order;
        razorpayData: import("razorpay-typescript/dist/resources/order").IRazorOrderId;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        success: boolean;
    }>;
    remove(id: string): string;
}
