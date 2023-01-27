import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemService } from './item.service';
import { UserModule } from '../user/user.module';
import { ItemController } from './item.controller';
import { ItemSchema } from './models/item.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Item', schema: ItemSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [ItemService],
  exports: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
