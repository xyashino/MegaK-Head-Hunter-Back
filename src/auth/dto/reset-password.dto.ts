import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  resetPasswordToken: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  newPassword: string;
}
