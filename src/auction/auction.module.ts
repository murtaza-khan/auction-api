import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionService } from './auction.service';
import { UserModule } from '../user/user.module';
import { AuctionSchema } from './models/auction.model';
import { AuctionController } from './auction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Auction', schema: AuctionSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [AuctionService],
  exports: [AuctionService],
  controllers: [AuctionController],
})
export class AuctionModule {}
