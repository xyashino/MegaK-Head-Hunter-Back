import {
  Contains,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
    format: 'password',
  })
  @ValidateIf((obj) => obj.role === UserRole.ADMIN)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd?: string;
}
