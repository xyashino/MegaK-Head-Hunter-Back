import {
  Contains,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { StudentTypeWork } from 'src/enums/students-type-work.enums';
import { StudentStatus } from 'src/enums/student-status.enums';
import { StudentContactType } from 'src/enums/student-contract-type.enums';

export class UpdateStudentDto implements Partial<CreateStudentDto> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email?: string;
  

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  courseEngagment: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  projectDegree?: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsNotEmpty()
  @IsArray()
  bonusProjectUrls: string[];

  @IsOptional()
  @IsString()
  tel?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  githubUsername?: string;

  @IsOptional()
  @IsArray()
  portfolioUrls?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  projectUrls?: string[];

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StudentTypeWork)
  expectedTypeWork?: StudentTypeWork;

  @IsOptional()
  @IsString()
  targetWorkCity?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType?: StudentContactType;

  @IsOptional()
  @IsString()
  expectedSalary?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  monthsOfCommercialExp?: number;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  workExperience?: string;

  @IsOptional()
  @IsString()
  courses?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;
}
