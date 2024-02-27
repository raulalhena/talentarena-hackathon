import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

class Device {
  deviceId: ObjectId;
  isActive: boolean;
  country: string;
  latitude: string;
  longitude: string;
  networkAccessIdentifier: string;
  currentProfile: string;
}

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  devices: [Device];
}

export const UserSchema = SchemaFactory.createForClass(User);
