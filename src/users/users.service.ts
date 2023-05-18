import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPwd } from '@utils/hash-pwd';
import { UserStatus } from '@enums/user-status.enums';

@Injectable()
export class UsersService {
  async create({ email, pwd, role }: CreateUserDto) {
    await this.checkConflictData(email);
    const newUser = new User();
    newUser.email = email;
    if (pwd) await this.updatePassword(pwd, newUser);

    newUser.role = role;
    return await newUser.save();
  }
  findAll() {
    return User.find();
  }

  async findOne(id: string) {
    const user = await User.findOne({
      relations: { hr: true, student: true },
      where: { id },
    });
    if (!user) throw new NotFoundException('Nieprawidłowy id użytkownika');
    return user;
  }

  async update(
    id: string,
    { pwd, email, role, oldPwd, newPwd }: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (email) {
      await this.checkConflictData(email);
      user.email = email;
    }

    if (pwd) await this.updatePassword(pwd, user);

    if (oldPwd && newPwd) {
      if (hashPwd(oldPwd) !== user.hashedPassword)
        throw new BadRequestException('Nieprawidłowe dane uwierzytelniające');
      await this.updatePassword(newPwd, user);
    }

    user.role = role ?? user.role;
    return user.save();
  }

  async remove(id: string) {
    return (await this.findOne(id)).remove();
  }

  async checkConflictData(email: string): Promise<void> {
    const userExist = await User.findOneBy({ email });
    if (userExist) throw new ConflictException('Email jest zajęty');
  }

  async updatePassword(newPwd: string, user: User) {
    user.hashedPassword = hashPwd(newPwd);
    user.isActive = UserStatus.ACTIVE;
  }
}
