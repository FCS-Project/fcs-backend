import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  razorpayPaymentId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  razorpayOrderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  paymentStatus: boolean;
}
