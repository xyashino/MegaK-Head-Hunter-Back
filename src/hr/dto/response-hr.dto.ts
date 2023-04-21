import { Expose } from 'class-transformer';

export class ResponseHrDto {
  @Expose()
  id:string;
  @Expose()
  email:string;
  @Expose()
  fullName:string;
  @Expose()
  company:string;
  @Expose()
  isActive:boolean;
  @Expose()
  maxReservedStudents:number;
}
