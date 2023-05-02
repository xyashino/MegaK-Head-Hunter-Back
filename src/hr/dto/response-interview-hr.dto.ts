import { Expose } from 'class-transformer';

export class ResponseInterviewHrDto {
  @Expose()
  id: string;
  @Expose()
  fullName: string;
  @Expose()
  company: string;
  @Expose()
  maxReservedStudents: number;
}
