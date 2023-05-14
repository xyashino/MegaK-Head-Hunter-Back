import { Expose } from 'class-transformer';

export class CreateInterviewResponseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  bookingDate: Date;
}
