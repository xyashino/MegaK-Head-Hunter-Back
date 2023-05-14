import { Contains, IsString } from 'class-validator';

export class SendResetEmailDto {
  @IsString()
  @Contains('@')
  email: string;
}
