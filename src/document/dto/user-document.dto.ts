import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDocumentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
