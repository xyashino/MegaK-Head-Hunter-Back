import { Exclude, Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { Student } from '../entities/student.entity';

export class ResponseStudentDto implements Partial<Student> {
  @Exclude()
  user: User;
  @Expose()
  get email() {
    console.log(this);
    return this.user ? this.user.email : null;
  }
  @Expose()
  get isActive() {
    return this.user ? this.user.isActive : null;
  }
  @Expose()
  get userId() {
    return this.user ? this.user.id : null;
  }
}
