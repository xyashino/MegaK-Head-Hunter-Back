import {ConflictException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {ConfigService} from "@nestjs/config";
@Injectable()
export class UsersService {
  @Inject(forwardRef(() => ConfigService))
  public configService: ConfigService;

  async create({email,password}: CreateUserDto) {
    await this.checkConflictData(email);
    const newUser = new User();
    newUser.email = email;

    //@TODO hash
    // newUser.hashedPassword =
    return await newUser.save();
  }

  findAll() {
    return User.find();
  }

  async findOne(id: string) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, {password,newPassword,email}: UpdateUserDto) {
    const user = await this.findOne(id);
    if(email) {
      await this.checkConflictData(email);
      user.email = email;
    }
    if(newPassword) {
      //@TODO compare and hash
      // newUser.hashedPassword =
    }
    return user.save();
  }

  async remove(id: string) {
    return await this.findOne(id)
  }

  private async checkConflictData(email: string): Promise<void> {
    const userExist = await User.findOneBy({ email });
    if (userExist) throw new ConflictException('Email is taken');
  }
}