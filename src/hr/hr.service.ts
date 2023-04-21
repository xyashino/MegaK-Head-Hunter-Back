import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';
import { RegisterHrDto } from './dto/register-hr.dto';
import { UsersService } from '../users/users.service';
import { Hr } from './entities/hr.entity';
import { UserRole } from '../enums/user-role.enums';
import { QueryHrDto } from './dto/query-hr.dto';

@Injectable()
export class HrService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  async create({ email, ...rest }: CreateHrDto) {
    await this.checkConflictData(email);
    const newHr = new Hr();
    this.applyDataToEntity(newHr, rest);
    newHr.email = email;
    const addedHr = await newHr.save();
    //@TODO send email
    return addedHr;
  }

  findAll({ user }: QueryHrDto) {
    if (user) return this.findOneByUserId(user);

    return Hr.find();
  }
  async findOne(id: string) {
    const hr = await Hr.findOne({ where: { id }, relations: { user: true } });
    if (!hr) throw new NotFoundException('Invalid hr id');
    return hr;
  }
  async findOneByUserId(id: string) {
    const hr = await Hr.findByUserId(id);
    if (!hr) throw new NotFoundException('Invalid userId');
    return hr;
  }

  async register({ pwd }: RegisterHrDto, id) {
    const hr = await this.findOne(id);
    if (hr.isActive)
      throw new ConflictException('The user has been registered');
    const newUser = await this.usersService.create({
      email: hr.email,
      pwd,
      role: UserRole.HR,
    });
    hr.isActive = true;
    hr.user = newUser;
    return hr.save();
  }

  async update(id: string, { email, pwd, newPwd, ...rest }: UpdateHrDto) {
    const hr = await this.findOne(id);
    if (!hr.isActive) throw new ForbiddenException();
    if (email) await this.checkConflictData(email);

    if (hr.user.id) {
      await this.usersService.update(hr.user.id, {
        email,
        pwd,
        newPwd,
        role: UserRole.HR,
      });
    }

    hr.email = email;
    this.applyDataToEntity(hr, rest);
    return hr.save();
  }

  async remove(id: string) {
    const hr = await this.findOne(id);
    if (!hr.isActive) {
      return await hr.remove();
    }
    await this.usersService.remove(id);
    return await hr.remove();
  }

  private async checkConflictData(email: string): Promise<void> {
    await this.usersService.checkConflictData(email);
    const hrExist = await Hr.findOneBy({ email });
    if (hrExist) throw new ConflictException('Email is taken');
  }

  private applyDataToEntity<T extends {}>(entity: T, data: Partial<T>) {
    for (const [key, value] of Object.entries(data)) {
      entity[key] = value;
    }
  }
}
