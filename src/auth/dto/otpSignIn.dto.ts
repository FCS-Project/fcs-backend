import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class OtpSignInDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @MinLength(10)
  @ApiProperty()
  mobileNumber: string;
}
