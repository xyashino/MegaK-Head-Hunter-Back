import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateIf
} from 'class-validator';
import {StudentTypeWork} from "../../enums/students-type-work.enums";
import {StudentContactType} from "../../enums/student-contract-type.enums";
import {StudentStatus} from "../../enums/student-status.enums";

export class RegisterStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;


  @IsOptional()
  @ValidateIf(({obj})=> obj?.tel !== null )
  @IsString()
  tel: string | null;

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
  @ValidateIf(({obj})=> obj?.targetWorkCity !== null )
  @IsString()
  targetWorkCity: string | null;

  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType: StudentContactType;

  @IsOptional()
  @ValidateIf(({obj})=> obj?.expectedSalary !== null )
  @IsString()
  expectedSalary: string | null;

  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsInt()
  @Min(0)
  monthsOfCommercialExp: number;

  @IsOptional()
  @ValidateIf(({obj})=> obj.education !== null )
  @IsString()
  education: string | null;

  @IsOptional()
  @ValidateIf(({obj})=> obj.workExperience !== null )
  @IsString()
  workExperience: string | null;

  @IsOptional()
  @IsString()
  courses: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status: StudentStatus;
}
