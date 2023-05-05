import {
  Contains,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((obj) => obj.role === UserRole.ADMIN)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd?: string;
}
