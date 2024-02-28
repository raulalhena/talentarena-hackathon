import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export class Device {
  deviceId: string;
  isActive: boolean;
  country: string;
  latitude: string;
  longitude: string;
  networkAccessIdentifier: string;
  publicAddress: string;
  privateAddress: string;
  publicPort: number;
  currentProfile: string;
}

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  devices: Device[];
}

export const UserSchema = SchemaFactory.createForClass(User);
