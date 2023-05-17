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
  'Podane dane muszą być liczbą i mieć maksymalnie dwa miejsca po przecinku';

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
