import { Expose, Transform } from 'class-transformer';
import { Hr } from '../entities/hr.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseHrDto implements Partial<Hr> {
  @ApiProperty({
    description: 'Hr ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The status of the hr',
    example: false,
  })
  @Expose()
  @Transform(({ obj }) => obj.user.isActive)
  isActive: boolean;

  @ApiProperty({
    description: 'The email of the Hr user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @Expose()
  @Transform(({ obj }) => obj.user.email)
  email: string;

  @ApiProperty({
    description: 'User ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: string;

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
