import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UsersService {
  async create({ email, pwd }: CreateUserDto) {
    await this.checkConflictData(email);
    const newUser = new User();
    newUser.email = email;

    newUser.hashedPassword = hashPwd(pwd);
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

  async update(id: string, { pwd, newPwd, email }: UpdateUserDto) {
    const user = await this.findOne(id);
    if (email) {
      await this.checkConflictData(email);
      user.email = email;
    }
    if (newPwd && hashPwd(pwd) === user.hashedPassword) {
      user.hashedPassword = hashPwd(newPwd);
    }
    return user.save();
  }

  async remove(id: string) {
    return await this.findOne(id);
  }

  private async checkConflictData(email: string): Promise<void> {
    const userExist = await User.findOneBy({ email });
    if (userExist) throw new ConflictException('Email is taken');
  }
}
