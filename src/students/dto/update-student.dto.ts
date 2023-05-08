import {
  Contains,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { CreateStudentDto } from './create-student.dto';
import { StudentTypeWork } from 'src/common/enums/students-type-work.enums';
import { StudentStatus } from 'src/common/enums/student-status.enums';
import { StudentContactType } from 'src/common/enums/student-contract-type.enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto implements Partial<CreateStudentDto> {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email?: string;

  @ApiProperty({
    description: 'The student telephone numer',
    example: '500500500',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.tel !== null)
  @IsString()
  tel?: string | null;

  @ApiProperty({
    description: 'The student first name',
    example: 'John',
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: 'The student last name',
    example: 'Wick',
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'The student github username',
    example: 'John',
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  githubUsername?: string | null;

  @ApiProperty({
    description: 'Array with student portfolio project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  portfolioUrls?: string[];

  @ApiProperty({
    description: 'Array with student  project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  projectUrls?: string[];

  @ApiProperty({
    description: 'The student biography',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.bio !== null)
  @IsString()
  bio?: string | null;

  @ApiProperty({
    description: 'The student expected type work',
    example: StudentContactType.NOPREFERENCE,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StudentTypeWork)
  expectedTypeWork?: StudentTypeWork;

  @ApiProperty({
    description: 'The student work experience',
    example: 'Kraków',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.targetWorkCity !== null)
  @IsString()
  targetWorkCity?: string | null;

  @ApiProperty({
    description: 'The student expected contract type',
    example: StudentContactType.NOPREFERENCE,
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType?: StudentContactType;

  @ApiProperty({
    description: 'The student expected salary',
    example: '8000',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.expectedSalary !== null)
  @IsString()
  expectedSalary?: string | null;

  @ApiProperty({
    description: 'The student can take part in internships',
    example: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship?: boolean;

  @ApiProperty({
    description: 'Student commercial experience in months',
    example: 14,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  monthsOfCommercialExp?: number;

  @ApiProperty({
    description: 'The student education',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.education !== null)
  @IsString()
  education?: string | null;

  @ApiProperty({
    description: 'The student work experience',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.workExperience !== null)
  @IsString()
  workExperience?: string | null;

  @ApiProperty({
    description: 'The student courses',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.courses !== null)
  @IsString()
  courses?: string;

  @ApiProperty({
    description: 'The student status',
    example: StudentStatus.AVAILABE,
    type: String,
  })
  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;
}
