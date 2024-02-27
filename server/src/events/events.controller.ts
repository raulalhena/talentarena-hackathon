import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LocationRetrieval } from './dto/locationretrieval.dto';
import { VerifyLocationDto } from './dto/verify-location.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Post('location-retrieval')
  locationRetrieval(@Body() locationRetrievalDto: LocationRetrieval) {
    return this.eventsService.locationRetrieval(locationRetrievalDto);
  }

  @Post('verify-location')
  verifyRetrieval(@Body() verifyLocationDto: VerifyLocationDto) {
    return this.eventsService.verifyLocation(verifyLocationDto);
  }

  @Get('/:id/slice/')
  createSlice() {
    return this.eventsService.getSlice();
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
