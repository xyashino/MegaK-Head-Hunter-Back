import {
  Contains,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHrDto {
  @ApiProperty({
    description: 'The email of the Hr user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @Contains('@')
  email: string;

  @ApiProperty({
    description: 'The full name of the HR user',
    example: 'John Wick',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'The name of the HR company',
    example: 'HR Corp',
  })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({
    description: 'The maxium number of reserved students',
    example: 55,
  })
  @IsInt()
  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
