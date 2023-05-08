import {
  Contains,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
const DECIMAL_MESSAGE_VALIDATION =
  'Given data must be a number and have a maximum of two decimal';

export class CreateStudentDto {
  @ApiProperty({
    description: 'The email of the Student user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @Contains('@')
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Course completion assessment',
    example: 4.45,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: DECIMAL_MESSAGE_VALIDATION,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @ApiProperty({
    description: 'Course engagement assessment',
    example: 4.45,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: DECIMAL_MESSAGE_VALIDATION,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @ApiProperty({
    description: 'Project degree assessment',
    example: 4.45,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: DECIMAL_MESSAGE_VALIDATION,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @ApiProperty({
    description: 'Team project degree assessment',
    example: 4.45,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: DECIMAL_MESSAGE_VALIDATION,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @ApiProperty({
    description: 'Array with bonus project urls',
    example: [
      'https://github.com/xyashino/MegaK-Head-Hunter-Front',
      'https://github.com/xyashino/MegaK-Head-Hunter-Back',
    ],
  })
  @IsNotEmpty()
  @IsArray()
  bonusProjectUrls: string[];
}
