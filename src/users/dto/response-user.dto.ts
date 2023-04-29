import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserRole } from '../../enums/user-role.enums';

export class ResponseUserDto implements Partial<User> {
  @Exclude()
  email: string;
  @Exclude()
  isActive: boolean;
  @Exclude()
  role: UserRole;
}
