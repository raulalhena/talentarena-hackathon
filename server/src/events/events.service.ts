import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LocationRetrieval } from './dto/locationretrieval.dto';
import { VerifyLocationDto } from './dto/verify-location.dto';

@Injectable()
export class EventsService {
  async create(createEventDto: CreateEventDto) {
    return 'create';
  }

  async createSlice() {
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
          }),
        },
      );

      const result = await resp;
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
      deviceStatus: 'attached',
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

  async deactivateSclie() {
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
          body: JSON.stringify({
            device: {
              networkAccessIdentifier: 'device@testcsp.net',
              ipv4Address: {
                publicAddress: '192.0.2.3',
                privateAddress: '192.0.2.204',
                publicPort: 80,
              },
            },
            maxAge: 60,
          }),
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
      console.log(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
