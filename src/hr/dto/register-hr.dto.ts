import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterHrDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;
}
