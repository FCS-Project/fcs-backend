import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, DocumentModule, PrismaModule],
})
export class AppModule {}
