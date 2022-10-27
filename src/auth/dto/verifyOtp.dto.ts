import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  @MinLength(6)
  @ApiProperty()
  otp: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @MinLength(10)
  @ApiProperty()
  mobileNumber: string;
}
