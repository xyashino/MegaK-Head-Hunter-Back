import { ResponseStudentDto } from './response-student.dto';
import { PageMetaDto } from '../../common/dtos/page/page-meta.dto';
import { Expose, Transform } from 'class-transformer';
import { Student } from '../entities/student.entity';
import { transformArrayDataToDtoInstance } from '../../utils/mappers/array-data-to-dto.mapper';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindAllStudentsDto {
  @ApiProperty({
    description: 'Successfully retrieved array of Student',
    type: [ResponseStudentDto],
  })
  @Expose()
  @Transform(({ obj }) =>
    transformArrayDataToDtoInstance(obj.data, ResponseStudentDto),
  )
  data: Student[];

  @ApiProperty({
    description: 'Object containing pagination information',
    type: PageMetaDto,
  })
  @Expose()
  meta: PageMetaDto;
}
