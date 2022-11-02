import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imgSrc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  price: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
