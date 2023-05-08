import { PageMetaDtoParameters } from '../../interfaces/page-meta';
import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  readonly take: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 50,
  })
  readonly itemCount: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5,
  })
  readonly pageCount: number;

  @ApiProperty({
    description: 'Indicates if there is a previous page',
    example: true,
  })
  readonly hasPreviousPage: boolean;

  @ApiProperty({
    description: 'Indicates if there is a next page',
    example: true,
  })
  readonly hasNextPage: boolean;

  constructor({ searchOptions, itemCount }: PageMetaDtoParameters) {
    this.page = searchOptions.page;
    this.take = searchOptions.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
