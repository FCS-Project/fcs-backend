import { ApiProperty } from '@nestjs/swagger';
import {
  isBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  @MinLength(6)
  @ApiProperty()
  otp: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  editInfo: boolean;
}
