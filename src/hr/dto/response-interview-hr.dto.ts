import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseInterviewHrDto {
  @ApiProperty({
    description: 'Hr ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The full name of the HR user',
    example: 'John Wick',
  })
  @Expose()
  fullName: string;

  @ApiProperty({
    description: 'The name of the HR company',
    example: 'HR Corp',
  })
  @Expose()
  company: string;

  @ApiProperty({
    description: 'The maxium number of reserved students',
    example: 55,
  })
  @Expose()
  maxReservedStudents: number;
}
