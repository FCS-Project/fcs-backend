import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty({ required: false })
  mobileNumber: string;
}
