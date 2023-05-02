import { Expose, plainToClass, Transform } from 'class-transformer';
import { ResponseBaseStudentDto } from '../../students/dto/student-base-response.dto';

export class ResponseInterviewDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  bookingDate: Date;

  @Expose()
  @Transform((obj) => {
    return plainToClass(ResponseBaseStudentDto, obj.value);
  })
  student: ResponseBaseStudentDto;
}
