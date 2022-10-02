import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, DocumentModule],
})
export class AppModule {}
