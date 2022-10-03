import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  //   @IsNotEmpty()
  //   user: User;
}
