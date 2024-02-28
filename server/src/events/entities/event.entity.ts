import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type EventDocument = HydratedDocument<Event>;

export class Event {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
    default: [],
  })
  attendees: mongoose.Types.ObjectId[];
  @Prop()
  currentSlice: string;
  @Prop()
  sliceStatus: string;
  @Prop()
  maxDevices: number;
  @Prop()
  maxConnections: number;
  @Prop()
  startedAt: Date;
  @Prop()
  finishedAt: Date;
  @Prop()
  location: string;
  @Prop()
  eventStatus: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
