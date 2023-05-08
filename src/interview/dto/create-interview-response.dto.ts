import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewResponseDto {
  @ApiProperty({
    description: 'Interview ID',
    example: 'b6367e08-01de-42b2-bf37-060c61176080',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-05-01 00:00:00',
    format: 'date',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Booking date',
    example: '2023-05-11 00:00:00',
    format: 'date',
  })
  @Expose()
  bookingDate: Date;
}
