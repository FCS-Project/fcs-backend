import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  imports: [
    UserModule,
    DocumentModule,
    PrismaModule,
    AuthModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
