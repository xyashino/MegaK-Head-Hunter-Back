import { Contains, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendResetEmailDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'admin@gmail.com',
  })
  @IsString()
  @Contains('@')
  email: string;
}
