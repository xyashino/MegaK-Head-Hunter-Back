import { CreateHrDto } from './create-hr.dto';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHrDto implements Partial<CreateHrDto> {
  @ApiProperty({
    description: 'The full name of the HR user',
    example: 'John Wick',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @ApiProperty({
    description: 'The name of the HR company',
    example: 'HR Corp',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  company?: string;

  @ApiProperty({
    description: 'The maxium number of reserved students',
    example: 55,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(999)
  maxReservedStudents?: number;

  @ApiProperty({
    description: 'The password of the Hr user',
    example: '12345678',
    format: 'password',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  pwd?: string;
}
