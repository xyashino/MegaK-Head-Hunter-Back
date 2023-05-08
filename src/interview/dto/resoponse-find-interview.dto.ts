import { PageMetaDto } from '../../common/dtos/page/page-meta.dto';
import { Expose, Transform } from 'class-transformer';
import { transformArrayDataToDtoInstance } from '../../utils/mappers/array-data-to-dto.mapper';
import { ResponseInterviewDto } from './response-interview.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindInterviewDto {
  @ApiProperty({
    description: 'Successfully retrieved array of Student',
    type: [ResponseInterviewDto],
  })
  @Expose()
  @Transform(({ obj }) =>
    transformArrayDataToDtoInstance(obj.data, ResponseInterviewDto),
  )
  data: ResponseInterviewDto[];

  @ApiProperty({
    description: 'Object containing pagination information',
    type: PageMetaDto,
  })
  @Expose()
  meta: PageMetaDto;
}
