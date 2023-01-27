
import { Prop, Schema } from '@nestjs/mongoose';
import {now} from "mongoose";


@Schema()
export class BaseModel {
  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;

}
