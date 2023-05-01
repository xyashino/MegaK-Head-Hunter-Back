import { ResponseStudentDto } from './response-student.dto';
import { PageMetaDto } from '../../common/dtos/page/page-meta.dto';
import { Expose, Transform } from 'class-transformer';
import { Student } from '../entities/student.entity';
import { transformArrayDataToDtoInstance } from '../../utils/mappers/array-data-to-dto.mapper';

export class ResponseFindAllStudentsDto {
  @Expose()
  @Transform(({ obj }) =>
    transformArrayDataToDtoInstance(obj.data, ResponseStudentDto),
  )
  data: Student[];

  @Expose()
  meta: PageMetaDto;
}
