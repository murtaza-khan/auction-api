import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { Location } from '../../item/models/item.model';
import { UserRole } from '../../common/enums';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseModel {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  notificationToken: string;

  @Prop({ type: String, enum: UserRole })
  userRole: string;

  @Prop(Location)
  location: Location;
}

export const UserSchema = SchemaFactory.createForClass(User);
