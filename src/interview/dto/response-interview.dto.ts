import { Expose, plainToClass, Transform } from 'class-transformer';
import { ResponseBaseStudentDto } from '../../students/dto/student-base-response.dto';
import { ResponseInterviewHrDto } from '../../hr/dto/response-interview-hr.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseInterviewDto {
  @ApiProperty({
    description: 'Interview ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-05-01 00:00:00',
    format: 'date',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Booking date',
    example: '2023-05-11 00:00:00',
    format: 'date',
  })
  @Expose()
  bookingDate: Date;

  @ApiProperty({
    description: 'Student data',
    type: ResponseBaseStudentDto,
  })
  @Expose()
  @Transform((obj) => {
    return plainToClass(ResponseBaseStudentDto, obj.value);
  })
  student: ResponseBaseStudentDto;

  @ApiProperty({
    description: 'HR data',
    type: ResponseInterviewHrDto,
  })
  @Expose()
  @Transform(({ obj }) => {
    return plainToClass(ResponseInterviewHrDto, obj.hr);
  })
  hr: ResponseInterviewHrDto;
}
