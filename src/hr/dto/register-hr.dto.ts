import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterHrDto {
  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;
}
