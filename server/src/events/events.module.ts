import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
    forwardRef(() =>
      MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema,
        },
      ]),
    ),
  ],
  controllers: [EventsController],
  providers: [EventsService, Event, UsersService],
  exports: [EventsService, Event],
})
export class EventsModule {}
