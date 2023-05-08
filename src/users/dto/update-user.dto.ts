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
import { UserRole } from '../../enums/user-role.enums';

export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPwd?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ValidateIf((obj) => obj.newPassword !== undefined || obj.isActive)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  pwd?: string;
}
