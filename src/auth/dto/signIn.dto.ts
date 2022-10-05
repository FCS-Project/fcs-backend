import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  mobileNumber: string;
}
