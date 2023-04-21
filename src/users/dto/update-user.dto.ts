import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  Contains,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../enums/user-role.enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPwd: string;

  @ValidateIf((obj) => obj.newPassword !== undefined)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  pwd: string;
}
