import { Expose, Transform } from 'class-transformer';
import { Hr } from '../entities/hr.entity';

export class ResponseHrDto implements Partial<Hr> {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.user.isActive)
  isActive: boolean;

  @Expose()
  @Transform(({ obj }) => obj.user.email)
  email: null;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: boolean;

  @Expose()
  fullName: string;

  @Expose()
  company: string;

  @Expose()
  maxReservedStudents: number;
}
