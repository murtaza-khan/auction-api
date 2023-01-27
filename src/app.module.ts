import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import * as dotenv from 'dotenv';
import { AuctionModule } from './auction/auction.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards';
import { JwtAuthGuard } from './auth/guards';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATA_BASE}`),
    UserModule,
    AuthModule,
    ItemModule,
    AuctionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
