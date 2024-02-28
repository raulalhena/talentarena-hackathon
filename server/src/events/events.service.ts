import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LocationRetrieval } from './dto/locationretrieval.dto';
import { VerifyLocationDto } from './dto/verify-location.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async findAll() {
    try {
      return await this.eventModel.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }
      const foundEvent = await this.eventModel.findById(id);

      if (foundEvent) {
        const updatedUsersPromises = foundEvent['users'].flatMap(
          async (foundEvent) => {
            await this.usersService.findOne(foundEvent.toString());
          },
        );

        await Promise.all(updatedUsersPromises);
      }

      return await foundEvent.populate('users');
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createEventDto: CreateEventDto) {
    try {
      const createdSlice = await this.createSlice(
        createEventDto.maxConnections,
        createEventDto.maxDevices,
      );

      // if (createdSlice) {
      // createEventDto.currentSlice = createdSlice.name;
      // createEventDto.sliceStatus = createdSlice.state;
      // } else {
      createEventDto.currentSlice = 'SLICE_1';
      createEventDto.sliceStatus = 'AVAILABLE';
      console.log('no');
      // }

      const createdEvent = await this.eventModel.create(createEventDto);

      return (await this.eventModel.findById(createdEvent.id)).populate(
        'users',
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }

      const updatedEvent = await this.eventModel.findOneAndUpdate(
        { _id: id },
        updateEventDto,
      );
      return updatedEvent;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }

      const deletedEvent = await this.eventModel.findByIdAndDelete({ _id: id });
      return deletedEvent;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeAll() {
    try {
      const deletedEvents = await this.eventModel.deleteMany();
      return deletedEvents;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createSlice(maxDataConnections: number, maxDevices: number) {
    try {
      const resp = await fetch(
        'https://network-slicing.p-eu.rapidapi.com/slices',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '26b5104305msh5f17503ca63e34ap193df1jsn3cebb9f3a3ce',
            'X-RapidAPI-Host': 'network-slicing.nokia.rapidapi.com',
          },
          body: JSON.stringify({
            notificationUrl: 'https://example.com',
            networkIdentifier: {
              mcc: '236',
              mnc: '30',
            },
            sliceInfo: {
              service_type: 'eMBB',
              differentiator: '123456',
            },
            maxDataConnections: maxDataConnections,
            maxDevices: maxDevices,
          }),
        },
      );

      const result = await resp;
      // return result.json();
      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async attachDevice() {
    return {
      id: '1',
      slice: {
        sst: 0,
        sd: {},
      },
      deviceStatus: 'ATTACHED',
    };
  }

  async getSlice() {
    return {
      slice: {
        name: {},
        notificationUrl: '',
        notificationAuthToken: {},
        networkIdentifier: {
          mcc: '',
          mnc: '',
        },
        sliceInfo: {
          service_type: {
            '0': 'e',
            '1': 'M',
            '2': 'B',
            '3': 'B',
          },
          differentiator: {},
        },
        areaOfService: {
          polygon: [],
        },
        maxDataConnections: {},
        maxDevices: {},
        delayTolerance: {},
        sliceDownlinkThroughput: {
          guaranteed: 0,
          maximum: 0,
        },
        sliceUplinkThroughput: {
          guaranteed: 0,
          maximum: 0,
        },
        deviceDownlinkThroughput: {
          guaranteed: 0,
          maximum: 0,
        },
        deviceUplinkThroughput: {
          guaranteed: 0,
          maximum: 0,
        },
      },
      csi_id: {},
      service_order_id: {},
      name: '',
      state: 'PENDING',
    };
  }

  async deactivateSlice() {
    return '';
  }

  async activateSlice() {
    return '';
  }

  async locationRetrieval(locationRetrieval: LocationRetrieval) {
    try {
      const resp = await fetch(
        'https://location-retrieval.p-eu.rapidapi.com/retrieve',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '26b5104305msh5f17503ca63e34ap193df1jsn3cebb9f3a3ce',
            'X-RapidAPI-Host': 'location-retrieval.nokia.rapidapi.com',
          },
          body: JSON.stringify(locationRetrieval),
        },
      );
      const result = await resp.json();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyLocation(verifyLocation: VerifyLocationDto) {
    try {
      const resp = await fetch(
        'https://location-verification.p-eu.rapidapi.com/verify',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '26b5104305msh5f17503ca63e34ap193df1jsn3cebb9f3a3ce',
            'X-RapidAPI-Host': 'location-verification.nokia.rapidapi.com',
          },
          body: JSON.stringify(verifyLocation),
        },
      );

      const result = await resp.json();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSession(resourceId: string) {
    try {
      const resp = await fetch(
        `https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions/${resourceId}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '26b5104305msh5f17503ca63e34ap193df1jsn3cebb9f3a3ce',
            'X-RapidAPI-Host':
              'quality-of-service-on-demand.nokia.rapidapi.com',
          },
        },
      );
      const result = await resp.json();
      console.log(result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createSession(createSessionDto: CreateSessionDto) {
    try {
      const resp = await fetch(
        'https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '26b5104305msh5f17503ca63e34ap193df1jsn3cebb9f3a3ce',
            'X-RapidAPI-Host':
              'quality-of-service-on-demand.nokia.rapidapi.com',
          },
          body: JSON.stringify(createSessionDto),
        },
      );
      const result = await resp.json();
      console.log(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSession(id: string) {
    try {
      await fetch(
        `https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '26b5104305msh5f17503ca63e34ap193df1jsn3cebb9f3a3ce',
            'X-RapidAPI-Host':
              'quality-of-service-on-demand.nokia.rapidapi.com',
          },
        },
      );

      return { message: 'deleted session successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
