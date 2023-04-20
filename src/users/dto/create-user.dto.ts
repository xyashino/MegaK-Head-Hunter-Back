import {Contains, IsEnum, IsNotEmpty, IsString, MinLength} from 'class-validator';
import {UserRole} from "../../enums/user-role.enums";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Contains('@')
  email: string;

  @IsEnum(UserRole)
  role:UserRole;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd: string;
}
