import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/enums/user-role.enums';
import { createInterface } from 'node:readline/promises';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { validate } from 'class-validator';

const ERROR_MESSAGE = '❌️ Validation failed ❌️ \n';

@Injectable()
@Console({
  command: 'admin',
  description: 'Admin management',
})
export class AdminCommand {
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService;

  @Command({
    command: 'create',
    description: 'Create a new admin account',
  })
  async createAdmin(): Promise<void> {
    let email = '';
    let pwd = '';
    const role = UserRole.ADMIN;

    email = await this.askQuestion('❓️  What email should the admin include?');
    pwd = await this.askQuestion('👀️ Give the admin password 👀️');

    const createUserDto = plainToClass(CreateUserDto, { email, pwd, role });
    if (!(await this.validateByDto(createUserDto))) return;

    try {
      await this.usersService.create({ email, pwd, role });
      console.log(`✅️ Added new admin "${email} ${pwd}" ✅️`);
    } catch (error) {
      console.log(ERROR_MESSAGE, error.response?.message ?? error.message);
    }
  }

  private async validateByDto<T extends {}>(dto: T): Promise<boolean> {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      console.log(
        ERROR_MESSAGE,
        validationErrors.map((err) => err.constraints),
      );
      return false;
    }
    return true;
  }

  private async askQuestion(question: string) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await rl.question(`${question} \n Answer:  `);
    rl.close();
    return answer;
  }
}
