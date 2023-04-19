import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  email: string;

  @IsString()
  pwd: string;
}
