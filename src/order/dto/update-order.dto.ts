import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  paymentStatus: boolean;
}
