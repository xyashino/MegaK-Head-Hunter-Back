import {IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength} from 'class-validator';
import {StudentTypeWork} from "../../enums/students-type-work.enums";
import {StudentContactType} from "../../enums/student-contract-type.enums";
import {StudentStatus} from "../../enums/student-status.enums";

export class RegisterStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;


  @IsOptional()
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

  @IsOptional()
  @IsString()
  bio: string;


  @IsNotEmpty()
  @IsEnum(StudentTypeWork)
  expectedTypeWork: StudentTypeWork;

  @IsOptional()
  @IsString()
  targetWorkCity: string;

  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType: StudentContactType;

  @IsOptional()
  @IsString()
  expectedSalary: string;

  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsInt()
  @Min(0)
  monthsOfCommercialExp: number;

  @IsOptional()
  @IsString()
  education: string;

  @IsOptional()
  @IsString()
  workExperience: string;

  @IsOptional()
  @IsString()
  courses: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status: StudentStatus;
}
