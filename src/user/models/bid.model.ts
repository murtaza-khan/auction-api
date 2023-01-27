import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { Item } from '../../item/models/item.model';
import { User } from './user.model';
import { Auction } from '../../auction/models/auction.model';

export type BidDocument = HydratedDocument<Bid>;

@Schema()
export class Bid extends BaseModel {
  @Prop()
  bidPrice: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  item: Item;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' })
  auction: Auction;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
