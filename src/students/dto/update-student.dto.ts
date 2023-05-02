import {
  Contains,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min, ValidateIf,
} from 'class-validator';
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

  @IsOptional()
  @ValidateIf(({obj})=> obj?.tel !== null )
  @IsString()
  tel?: string | null;

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
  githubUsername?: string | null;

  @IsOptional()
  @IsArray()
  portfolioUrls?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  projectUrls?: string[];

  @IsOptional()
  @ValidateIf(({obj})=> obj?.bio !== null )
  @IsString()
  bio?: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StudentTypeWork)
  expectedTypeWork?: StudentTypeWork;

  @IsOptional()
  @ValidateIf(({obj})=> obj?.targetWorkCity !== null )
  @IsString()
  targetWorkCity?: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType?: StudentContactType;

  @IsOptional()
  @ValidateIf(({obj})=> obj?.expectedSalary !== null )
  @IsString()
  expectedSalary?: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  monthsOfCommercialExp?: number;

  @IsOptional()
  @ValidateIf(({obj})=> obj?.education !== null )
  @IsString()
  education?: string | null;

  @IsOptional()
  @ValidateIf(({obj})=> obj?.workExperience !== null )
  @IsString()
  workExperience?: string | null;
  @IsOptional()
  @ValidateIf(({obj})=> obj?.courses !== null )
  @IsString()
  courses?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;
}
