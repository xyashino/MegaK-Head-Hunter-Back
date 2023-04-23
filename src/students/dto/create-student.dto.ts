import {
  Contains,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { StudentContactType } from 'src/enums/student-contract-type.enums';
import { StudentStatus } from 'src/enums/student-status.enums';
import { StudentTypeWork } from 'src/enums/students-type-work.enums';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

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
  projectDegree: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsNotEmpty()
  @IsArray()
  bonusProjectUrls: string[];

  @IsString()
  tel: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  githubUsername: string;

  @IsArray()
  portfolioUrls: string[];

  @IsNotEmpty()
  @IsArray()
  projectUrls: string[];

  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsEnum(StudentTypeWork)
  expectedTypeWork: StudentTypeWork;

  @IsString()
  targetWorkCity: string;

  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType: StudentContactType;

  @IsString()
  expectedSalary: string;

  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsInt()
  @Min(0)
  monthsOfCommercialExp: number;

  @IsString()
  education: string;

  @IsString()
  workExperience: string;

  @IsString()
  courses: string;

  @IsEnum(StudentStatus)
  status: StudentStatus;
}
