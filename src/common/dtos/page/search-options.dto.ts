import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { StudentContactType } from 'src/enums/student-contract-type.enums';
import { StudentTypeWork } from 'src/enums/students-type-work.enums';

export class SearchOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly name?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsOptional()
  @IsString({ each: true })
  @IsEnum(StudentTypeWork, { each: true })
  expectedTypeWork: StudentTypeWork[];

  @IsOptional()
  @IsString({ each: true })
  @IsEnum(StudentContactType, { each: true })
  expectedContractType: StudentContactType[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  minSalary: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSalary: number;

  @IsOptional()
  @IsNumber()
  canTakeApprenticeship: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  monthsOfCommercialExp: number;
}
