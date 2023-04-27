import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { ResponseStudentDto } from '../../../students/dto/response-student.dto';

export class PageDto extends ResponseStudentDto {
  @IsArray()
  readonly data: ResponseStudentDto[];

  readonly meta: PageMetaDto;

  constructor(data: ResponseStudentDto[], meta: PageMetaDto) {
    super();
    this.data = data;
    this.meta = meta;
  }
}
