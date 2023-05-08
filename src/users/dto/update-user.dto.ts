import { CreateUserDto } from './create-user.dto';
import {
  Contains,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Partial<CreateUserDto> {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email?: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'The new password of the User',
    example: '12345678',
    format: 'password',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPwd?: string;

  @ApiProperty({
    description: 'The status of the user',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
    format: 'password',
  })
  @ValidateIf((obj) => obj.newPassword !== undefined || obj.isActive)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  pwd?: string;
}
