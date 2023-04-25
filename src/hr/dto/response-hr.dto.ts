import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { Hr } from '../entities/hr.entity';

export class ResponseHrDto implements Partial<Hr> {
  @Exclude()
  user: User;
  @Expose()
  get email() {
    return this.user.email;
  }
  @Expose()
  get isActive() {
    return this.user.isActive;
  }
  @Expose()
  get userId() {
    return this.user.id;
  }
  @Expose()
  company: string;
}
