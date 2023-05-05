import { PageMetaDtoParameters } from '../../interfaces/page-meta';

export class PageMetaDto {
  readonly page: number;

  readonly take: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

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
