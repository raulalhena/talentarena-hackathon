import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { EventsService } from 'src/events/events.service';
import { EventSchema } from 'src/events/entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() =>
      MongooseModule.forFeature([
        {
          name: Event.name,
          schema: EventSchema,
        },
      ]),
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService, User, EventsService],
  exports: [UsersService, User],
})
export class UsersModule {}
