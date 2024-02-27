import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

export class Event {
  @Prop()
  users: [ObjectId];
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
