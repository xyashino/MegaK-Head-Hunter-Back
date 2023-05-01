import { Expose } from 'class-transformer';

export class CreateInterviewResponseDto {
  @Expose()
  createdAt: Date;
  @Expose()
  bookingDate: Date;
}
