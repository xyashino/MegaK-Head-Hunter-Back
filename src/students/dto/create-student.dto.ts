import {
  Contains,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
const DECIMAL_MESSAGE_VALIDATION =
  'Given data must be a number and have a maximum of two decimal';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

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

  @IsNotEmpty()
  @IsArray()
  bonusProjectUrls: string[];
}
