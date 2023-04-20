import { Expose } from 'class-transformer';
import {UserRole} from "../../enums/user-role.enums";

export class ResponseUserDto   {
  @Expose()
  id: string;
  @Expose()
  email: string;

  @Expose()
  role: UserRole;
}
