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
  ValidateIf,
} from 'class-validator';
import { StudentTypeWork } from '../../common/enums/students-type-work.enums';
import { StudentContactType } from '../../common/enums/student-contract-type.enums';
import { StudentStatus } from '../../common/enums/student-status.enums';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterStudentDto {
  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;

  @ApiProperty({
    description: 'The student telephone numer',
    example: '500500500',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.tel !== null)
  @IsString()
  tel: string | null;

  @ApiProperty({
    description: 'The student first name',
    example: 'John',
    nullable: true,
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'The student last name',
    example: 'Wick',
    nullable: true,
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'The student github username',
    example: 'John',
    nullable: true,
  })
  @IsNotEmpty()
  @IsString()
  githubUsername: string;

  @ApiProperty({
    description: 'Array with student portfolio project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
    nullable: true,
  })
  @IsArray()
  portfolioUrls: string[];

  @ApiProperty({
    description: 'Array with student  project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
    nullable: true,
  })
  @IsNotEmpty()
  @IsArray()
  projectUrls: string[];

  @ApiProperty({
    description: 'The student biography',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty({
    description: 'The student expected type work',
    example: StudentContactType.NOPREFERENCE,
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(StudentTypeWork)
  expectedTypeWork: StudentTypeWork;

  @ApiProperty({
    description: 'The student work experience',
    example: 'Kraków',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.targetWorkCity !== null)
  @IsString()
  targetWorkCity: string | null;

  @ApiProperty({
    description: 'The student expected contract type',
    example: StudentContactType.NOPREFERENCE,
    type: String,
    nullable: true,
  })
  @IsNotEmpty()
  @IsEnum(StudentContactType)
  expectedContractType: StudentContactType;

  @ApiProperty({
    description: 'The student expected salary',
    example: '8000',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.expectedSalary !== null)
  @IsString()
  expectedSalary: string | null;

  @ApiProperty({
    description: 'The student can take part in internships',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  canTakeApprenticeship: boolean;

  @ApiProperty({
    description: 'Student commercial experience in months',
    example: 14,
    nullable: true,
  })
  @IsInt()
  @Min(0)
  monthsOfCommercialExp: null | number;

  @ApiProperty({
    description: 'The student education',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.education !== null)
  @IsString()
  education: string | null;

  @ApiProperty({
    description: 'The student work experience',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(({ obj }) => obj?.workExperience !== null)
  @IsString()
  workExperience: string | null;

  @ApiProperty({
    description: 'The student courses',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  courses: string;

  @ApiProperty({
    description: 'The student status',
    example: StudentStatus.AVAILABE,
    type: String,
  })
  @IsOptional()
  @IsEnum(StudentStatus)
  status: StudentStatus;
}
