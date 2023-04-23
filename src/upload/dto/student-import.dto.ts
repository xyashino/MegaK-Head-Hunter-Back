import { Contains, IsArray, IsNumber, Max, Min } from 'class-validator';

export class StudentImportDto {
  @Contains('@')
  email: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsArray()
  bonusProjectUrls: string[];
}
