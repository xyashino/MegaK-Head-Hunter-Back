import { PageMetaDto } from '../../common/dtos/page/page-meta.dto';
import { Expose, Transform } from 'class-transformer';
import { transformArrayDataToDtoInstance } from '../../utils/mappers/array-data-to-dto.mapper';
import { ResponseInterviewDto } from './response-interview.dto';

export class ResponseFindInterviewDto {
  @Expose()
  @Transform(({ obj }) =>
    transformArrayDataToDtoInstance(obj.data, ResponseInterviewDto),
  )
  data: ResponseInterviewDto[];

  @Expose()
  meta: PageMetaDto;
}
