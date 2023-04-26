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
import {applyDataToEntity} from "../utils/apply-data-to-entity";

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
    applyDataToEntity(newHr, rest);
    newHr.user = await this.usersService.create({
      email,
      role: UserRole.HR,
    });
    await newHr.save();
    await this.mailService.sendMail(
      email,
      'Rejestracja w Head Hunter',
      './register',
      {
        registrationLink: `${process.env.REGISTRATION_URL}/${newHr.id}`,
      },
    );
    return newHr;
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
    if (user.isActive) throw new ConflictException('The user has been registered');
    await this.usersService.update(user.id, { pwd });
    return this.findOne(id);
  }

  async update(id: string, { pwd, ...rest }: UpdateHrDto) {
    const hr = await this.findOne(id);
    const { user } = hr;
    if (!user.isActive) throw new ForbiddenException();
    await this.usersService.update(user.id, {
      pwd,
    });
    applyDataToEntity(hr, rest);
    return hr.save();
  }

  async remove(id: string) {
    const hr = await this.findOne(id);
    const result = await hr.remove();
    await this.usersService.remove(hr.user.id);
    return result
  }

}
