import { Expose, plainToClass, Transform } from 'class-transformer';
import { ResponseStudentOnInterviewDto } from './response-student-on-interview.dto';

export class ResponseInterviewDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  bookingDate: Date;

  @Expose()
  @Transform((obj) => {
    return plainToClass(ResponseStudentOnInterviewDto, obj.value);
  })
  student: ResponseStudentOnInterviewDto;
}
