import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @Length(10)
  @IsOptional()
  @ApiProperty({ required: false })
  mobileNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  role: Role;
}
