import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sharedWith: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dataURI: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
