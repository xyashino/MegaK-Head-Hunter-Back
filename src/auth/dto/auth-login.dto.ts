import { Contains, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'admin@gmail.com',
    format: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  @Contains('@')
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  pwd: string;
}
