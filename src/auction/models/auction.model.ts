
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { Item } from '../../item/models/item.model';

export type AuctionDocument = HydratedDocument<Auction>;

@Schema()
export class Auction extends BaseModel {
  @Prop()
  auctionName: string;

  @Prop()
  auctionDate: string;

  /**
   * item mongoDb ids for specific auction
   */
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);