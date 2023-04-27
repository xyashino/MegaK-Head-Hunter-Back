import { ResponseStudentDto } from './response-student.dto';
import { PageMetaDto } from '../../common/dtos/page/page-meta.dto';
import {
  Expose,
  Transform,
} from 'class-transformer';
import { Student } from '../entities/student.entity';
import {arrayDataToDto} from '../../utils/mappers/array-data-to-dto.mapper';

export class ResponsePaginationStudentsDto {
  @Expose()
  @Transform(({ obj }) => arrayDataToDto(obj.data, ResponseStudentDto))
  data: Student[];

  @Expose()
  @Transform(({ obj }) => obj.pageMetaDto)
  meta: PageMetaDto;
}
