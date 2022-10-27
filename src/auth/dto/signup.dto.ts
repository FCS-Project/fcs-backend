import { ApiProperty } from '@nestjs/swagger';
import { Role, Type } from '@prisma/client';
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

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  roles: Role[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  type: Type[];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  displaySrc: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  bannerSrc: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiProperty({ required: false })
  description: string;
}
