import { CreateHrDto } from './create-hr.dto';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateHrDto implements Partial<CreateHrDto> {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  company?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(999)
  maxReservedStudents?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd?: string;
}
