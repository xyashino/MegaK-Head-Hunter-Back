import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPwd } from '../utils/hash-pwd';
import { UserRole } from '../enums/user-role.enums';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(@Inject(MailService) private mailService: MailService) {}

  async create({ email, pwd, ...rest }: CreateUserDto) {
    await this.checkConflictData(email);
    const newUser = new User();
    this.applyDataToEntity(newUser, rest);
    newUser.email = email;
    newUser.hashedPassword = hashPwd(pwd);
    newUser.role = UserRole.HR;
    await newUser.save();
    // SEND EMAIL TO TEST
    // await this.mailService.sendMail(
    //   email,
    //   'Rejestracja w HeadHunter',
    //   './register',
    //   {
    //     registrationLink: `http://localhost:3000/register/${newUser.id}/`,
    //   },
    // );
    return newUser;
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

  async update(id: string, { pwd, newPwd, email, ...rest }: UpdateUserDto) {
    const user = await this.findOne(id);

    this.applyDataToEntity(user, rest);

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

  private applyDataToEntity<T extends {}>(entity: T, data: Partial<T>) {
    for (const [key, value] of Object.entries(data)) {
      entity[key] = value;
    }
  }
}
