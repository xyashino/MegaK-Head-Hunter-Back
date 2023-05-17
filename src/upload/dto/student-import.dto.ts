import {
  Contains,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

const decimalMessageValidation =
  'Podane dane muszą być liczbą i mieć maksymalnie dwa miejsca po przecinku';

export class StudentImportDto {
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

  @Transform(({ value }) => parseFloat(value.replace(',', '.')))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: decimalMessageValidation,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @Transform(({ value }) => parseFloat(value.replace(',', '.')))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: decimalMessageValidation,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @Transform(({ value }) => parseFloat(value.replace(',', '.')))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: decimalMessageValidation,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @Transform(({ value }) => parseFloat(value.replace(',', '.')))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: decimalMessageValidation,
    },
  )
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @Transform(({ value }) => value.split(','))
  @IsArray()
  bonusProjectUrls: string[];
}
