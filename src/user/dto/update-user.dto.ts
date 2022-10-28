import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(10)
  @IsOptional()
  @ApiProperty({ required: false })
  mobileNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  displaySrc: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bannerSrc: string;
}
