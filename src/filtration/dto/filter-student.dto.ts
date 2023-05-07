import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { StudentContactType } from 'src/enums/student-contract-type.enums';
import { StudentTypeWork } from 'src/enums/students-type-work.enums';

export class FilterStudentDto {
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
  @IsString()
  @IsEnum(StudentTypeWork)
  expectedTypeWork: StudentTypeWork;

  @IsOptional()
  @IsString()
  @IsEnum(StudentContactType)
  expectedContractType: StudentContactType;

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
