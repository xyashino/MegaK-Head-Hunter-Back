import { Expose } from 'class-transformer';
import { StudentStatus } from '../../common/enums/student-status.enums';
import { StudentContactType } from '../../common/enums/student-contract-type.enums';
import { Student } from '../entities/student.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBaseStudentDto implements Partial<Student> {
  @ApiProperty({
    description: 'Student ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Course completion assessment',
    example: 4.45,
  })
  @Expose()
  courseCompletion: number;

  @ApiProperty({
    description: 'Course engagement assessment',
    example: 4.45,
  })
  @Expose()
  courseEngagement: number;

  @ApiProperty({
    description: 'Project degree assessment',
    example: 4.45,
  })
  @Expose()
  projectDegree: number;

  @ApiProperty({
    description: 'Team project degree assessment',
    example: 4.45,
  })
  @Expose()
  teamProjectDegree: number;

  @ApiProperty({
    description: 'Array with bonus project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
  })
  @Expose()
  bonusProjectUrls: string[];

  @ApiProperty({
    description: 'The student telephone numer',
    example: '500500500',
    nullable: true,
  })
  @Expose()
  tel: null | string;

  @ApiProperty({
    description: 'The student first name',
    example: 'John',
    nullable: true,
  })
  @Expose()
  firstname: null | string;

  @ApiProperty({
    description: 'The student last name',
    example: 'Wick',
    nullable: true,
  })
  @Expose()
  lastname: null | string;

  @ApiProperty({
    description: 'The student github username',
    example: 'John',
    nullable: true,
  })
  @Expose()
  githubUsername: null | string;

  @ApiProperty({
    description: 'Array with student portfolio project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
    nullable: true,
  })
  @Expose()
  portfolioUrls: null | string[];

  @ApiProperty({
    description: 'Array with student  project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
    nullable: true,
  })
  @Expose()
  projectUrls: null | string[];

  @ApiProperty({
    description: 'The student biography',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
    nullable: true,
  })
  @Expose()
  bio: null | string;

  @ApiProperty({
    description: 'The student expected type work',
    example: StudentContactType.NOPREFERENCE,
    type: String,
  })
  @Expose()
  expectedTypeWork;

  @ApiProperty({
    description: 'The student work experience',
    example: 'Kraków',
    type: String,
    nullable: true,
  })
  @Expose()
  targetWorkCity: string;

  @ApiProperty({
    description: 'The student expected contract type',
    example: StudentContactType.NOPREFERENCE,
    type: String,
    nullable: true,
  })
  @Expose()
  expectedContractType: StudentContactType;

  @ApiProperty({
    description: 'The student status',
    example: StudentStatus.AVAILABE,
    type: String,
  })
  @Expose()
  status: StudentStatus;

  @ApiProperty({
    description: 'The student can take part in internships',
    example: false,
  })
  @Expose()
  canTakeApprenticeship: boolean;
}
