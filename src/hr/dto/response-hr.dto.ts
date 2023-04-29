import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { Hr } from '../entities/hr.entity';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Column } from 'typeorm';

export class ResponseHrDto implements Partial<Hr> {

  @Expose()
  id:string;

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
