import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
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

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false })
  roles: Role[];
}
