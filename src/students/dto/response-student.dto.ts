import { Exclude, Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { Student } from '../entities/student.entity';

export class ResponseStudentDto implements Partial<Student> {
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
}
