import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  devices: [
    {
      deviceId: ObjectId;
      isActive: boolean;
      country: string;
      latitude: string;
      longitude: string;
      phoneNumber: string;
      currentProfile: string;
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
