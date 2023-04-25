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
import { MailService } from '../mail/mail.service';

@Injectable()
export class HrService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}
  async create({ email, ...rest }: CreateHrDto) {
    const newHr = new Hr();
    this.applyDataToEntity(newHr, rest);
    newHr.user = await this.usersService.create({
      email,
      role: UserRole.HR,
    });
    await this.mailService.sendMail(
      email,
      'Rejestracja w Head Hunter',
      './register',
      {
        registrationLink: `http://localhost:5173/register/${newHr.id}`,
      },
    );
    return newHr.save();
  }

  findAll() {
    return Hr.find({ relations: { user: true } });
  }
  async findOne(id: string) {
    const hr = await Hr.findOne({ where: { id }, relations: { user: true } });
    if (!hr) throw new NotFoundException('Invalid id');
    return hr;
  }

  async register({ pwd }: RegisterHrDto, id) {
    const { user } = await this.findOne(id);
    if (user.isActive)
      throw new ConflictException('The user has been registered');
    await this.usersService.update(user.id, { isActive: true, pwd });
    return this.findOne(id);
  }

  async update(id: string, { pwd, ...rest }: UpdateHrDto) {
    const hr = await this.findOne(id);
    const { user } = hr;
    if (!user.isActive) throw new ForbiddenException();
    await this.usersService.update(user.id, {
      pwd,
    });
    this.applyDataToEntity(hr, rest);
    return hr.save();
  }

  async remove(id: string) {
    const hr = await this.findOne(id);
    await this.usersService.remove(hr.user.id);
    return await hr.remove();
  }

  private applyDataToEntity<T extends {}>(entity: T, data: Partial<T>) {
    for (const [key, value] of Object.entries(data)) {
      entity[key] = value;
    }
  }
}
