import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ObjectId } from 'mongoose';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  users?: ObjectId[];
  name?: string;
  startedAt?: Date;
  finishedAt?: Date;
  location?: string;
  eventStatus?: string;
  currentSlice?: string;
  sliceStatus?: string;
  maxDevices?: number;
  maxConnections?: number;
}
