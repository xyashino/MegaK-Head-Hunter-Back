import {Exclude} from 'class-transformer';
import {User} from "../entities/user.entity";
import {Hr} from "../../hr/entities/hr.entity";

export class ResponseUserDto implements Partial<User> {
  @Exclude()
  hashedPassword:string;
  @Exclude()
  currentTokenId:string;
  @Exclude()
  hr:Hr
}
