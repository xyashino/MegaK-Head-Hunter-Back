import { Expose } from 'class-transformer';

export class ResponseUserDto   {
  @Expose()
  id: string;
  @Expose()
  email: string;
}
