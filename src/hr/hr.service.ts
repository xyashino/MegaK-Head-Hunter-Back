import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  HttpException,
  HttpStatus,
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
import { applyDataToEntity } from '../utils/apply-data-to-entity';
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
    applyDataToEntity(newHr, rest);
    try {
      newHr.user = await this.usersService.create({
        email,
        role: UserRole.HR,
      });
      await newHr.save();
      // await this.mailService.sendMail(
      //   email,
      //   'Rejestracja w Head Hunter',
      //   './register',
      //   {
      //     registrationLink: `${process.env.HR_REGISTRATION_URL}/${newHr.id}`,
      //   },
      // );
    } catch (e) {
      await newHr.remove();
      await this.usersService.remove(newHr.user.id);
      throw new HttpException(
        'Something went wrong by sending the email. User has not been added',
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async getCurrentHr(user) {
    const hr = await Hr.findOne({
      where: { user },
    });
    if (!hr) throw new NotFoundException('Hr not found');
    return hr;
  }

  async register({ pwd }: RegisterHrDto, id) {
    const { user } = await this.findOne(id);
    if (user.isActive)
      throw new ConflictException('The user has been registered');
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
    return result;
  }
}
