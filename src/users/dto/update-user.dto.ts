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
import { UserRole } from '@enums/user-role.enums';

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
  @IsBoolean()
  isActive?: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  pwd?: string;

  @ValidateIf((o) => o.newPwd !== undefined)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty({
    message: 'Old password is required when new password is present',
  })
  oldPwd?: string;

  @ValidateIf((o) => o.oldPwd !== undefined)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty({
    message: 'New password is required when old password is present',
  })
  newPwd?: string;
}
