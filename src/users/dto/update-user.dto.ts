import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {Contains, IsNotEmpty, IsOptional, IsString, MinLength, ValidateIf} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Contains('@')
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    newPassword: string;

    @ValidateIf((obj) => obj.newPassword !== undefined)
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @IsOptional()
    password: string;
}