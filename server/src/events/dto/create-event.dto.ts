import { ObjectId } from 'mongoose';

export class CreateEventDto {
  users: ObjectId[];
  name: string;
  startedAt: Date;
  finishedAt: Date;
  location: string;
  eventStatus: string;
  currentSlice: string;
  sliceStatus: string;
  maxDevices: number;
  maxConnections: number;
}
