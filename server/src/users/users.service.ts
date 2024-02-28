import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, Device } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { EventsService } from 'src/events/events.service';
import { LocationRetrieval } from 'src/events/dto/locationretrieval.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly eventsService: EventsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      for (const device of createUserDto.devices as Device[]) {
        device.deviceId = randomUUID().toString();
      }

      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const foundUsers = await this.userModel.find();

      const updateDevicePromises = foundUsers.flatMap((foundUser) =>
        (foundUser.devices as Device[])
          .filter((device) => device.isActive)
          .map(async (device) => {
            const locationRetrieval: LocationRetrieval = {
              device: {
                networkAccessIdentifier: device.networkAccessIdentifier,
                ipv4Address: {
                  publicAddress: device.publicAddress,
                  privateAddress: device.privateAddress,
                  publicPort: device.publicPort,
                },
              },
              maxAge: 60,
            };
            const locationResponse =
              await this.eventsService.locationRetrieval(locationRetrieval);

            device.latitude = locationResponse.area.center.latitude;
            device.longitude = locationResponse.area.center.longitude;
            device.country = locationResponse.area.center.country;
          }),
      );

      await Promise.all(updateDevicePromises);

      return foundUsers;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }
      const foundUser = await this.userModel.findById(id);

      for (const device of foundUser.devices as Device[]) {
        if (device.isActive) {
          const locationRetrieval: LocationRetrieval = {
            device: {
              networkAccessIdentifier: device.networkAccessIdentifier,
              ipv4Address: {
                publicAddress: device.publicAddress,
                privateAddress: device.privateAddress,
                publicPort: device.publicPort,
              },
            },
            maxAge: 60,
          };
          const locationResponse =
            await this.eventsService.locationRetrieval(locationRetrieval);

          device.latitude = locationResponse.area.center.latitude;
          device.longitude = locationResponse.area.center.longitude;
          device.country = locationResponse.area.center.country;
        }
      }

      return foundUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }

      await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: id + ' updated',
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }

      const deletedUser = await this.userModel.findByIdAndDelete({ _id: id });
      return deletedUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeAll() {
    try {
      const deletedUsers = await this.userModel.deleteMany();
      return deletedUsers;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
