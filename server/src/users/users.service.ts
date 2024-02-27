import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, Device } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      for (const device of createUserDto.devices as Device[]) {
        device.deviceId = randomUUID().toString();
        console.log(device.deviceId);
      }

      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { statusCode: 400, message: 'Invalid ObjectId' };
      }
      const foundUser = await this.userModel.findById(id);
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

      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
      );
      return updatedUser;
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
