import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { ResponseStudentDto } from '../../../students/dto/response-student.dto';
import { Student } from '../../../students/entities/student.entity';

export class PageDto<T> extends ResponseStudentDto {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    super();
    this.data = data;
    this.meta = meta;
  }
}
