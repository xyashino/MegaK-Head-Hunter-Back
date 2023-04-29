import { Expose } from 'class-transformer';

export class CreateInterviewResponseDto {
  @Expose()
  created_at: Date;
  @Expose()
  booking_date: Date;
}
