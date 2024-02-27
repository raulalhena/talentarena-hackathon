import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
    default: [],
  })
  users: mongoose.Types.ObjectId[];
  @Prop()
  name: string;
  @Prop()
  startedAt: Date;
  @Prop()
  finishedAt: Date;
  @Prop()
  location: string;
  @Prop()
  eventStatus: string;
  @Prop()
  currentSlice: string;
  @Prop()
  sliceStatus: string;
  @Prop()
  maxDevices: number;
  @Prop()
  maxConnections: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
