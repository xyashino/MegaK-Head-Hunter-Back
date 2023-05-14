import { Contains, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  @Contains('@')
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  pwd: string;
}
