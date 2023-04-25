import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;
}
