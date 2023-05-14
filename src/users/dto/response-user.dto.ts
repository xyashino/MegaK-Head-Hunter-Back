import { Expose, Transform } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserRole } from '@enums/user-role.enums';
import { UserStatus } from '@enums/user-status.enums';
import { userRealizationMapper } from '@utils/mappers/user-relation.mapper';

export class ResponseUserDto implements Partial<User> {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  isActive: UserStatus;
  @Expose()
  role: UserRole;

  @Expose()
  @Transform(({ obj }) => userRealizationMapper(obj))
  data:
    | null
    | { id: string; fullName: string }
    | { id: string; fullName: string; githubUsername: string };
}
