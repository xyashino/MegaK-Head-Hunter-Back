import {Expose, plainToInstance, Transform} from 'class-transformer';
import { ResponseBaseStudentDto } from '@students/dto/student-base-response.dto';
import { ResponseInterviewHrDto } from '@hr/dto/response-interview-hr.dto';

export class ResponseInterviewDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  bookingDate: Date;

  @Expose()
  @Transform((obj) => {
    return plainToInstance(ResponseBaseStudentDto, obj.value);
  })
  student: ResponseBaseStudentDto;

  @Expose()
  @Transform(({ obj }) => {
    return plainToInstance(ResponseInterviewHrDto, obj.hr);
  })
  hr: ResponseInterviewHrDto;
}
