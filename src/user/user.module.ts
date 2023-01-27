import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './models/user.model';
import { ItemModule } from '../item/item.module';
import { BidSchema } from './models/bid.model';
import { BidController } from './bid.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Bid', schema: BidSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => ItemModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController, BidController],
})
export class UserModule {}
