import { Contains, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;
}
