import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [LoginService],
  controllers: [LoginController],
  imports: [PrismaModule],
})
export class LoginModule {}
