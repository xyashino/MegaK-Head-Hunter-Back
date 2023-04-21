import { IsOptional, IsUUID } from 'class-validator';

export class QueryHrDto {
  @IsOptional()
  @IsUUID()
  user?: string;
}
