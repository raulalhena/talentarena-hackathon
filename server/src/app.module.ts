import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/talentarena'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
