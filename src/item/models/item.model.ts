import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';

export type ItemDocument = HydratedDocument<Item>;

export class Location {
  @Prop()
  lat: string;

  @Prop()
  long: string;
}

@Schema()
export class Item extends BaseModel {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  category: string;

  @Prop()
  brand: string;

  @Prop(Location)
  location: Location;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
