import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'User ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Token to reset password',
    example:
      '38d2cacb396699d2ae44339085ee26bdf70bcad328514e4c3dfde4c41eb5eb80894229595c7b0a967b39d279ce98970b2c62e2423ef11080ae7c996cd8f07c01',
    format: 'password-token',
  })
  @IsString()
  @IsNotEmpty()
  resetPasswordToken: string;

  @ApiProperty({
    description: 'The new password of the User',
    example: '12345678',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  newPassword: string;
}
