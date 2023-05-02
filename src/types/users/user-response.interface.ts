import {RoleEnum} from "../EnumTypes";

export interface UserResponseBase {
  id: string;
  email: string;
}
interface UserAdminResponse extends UserResponseBase {
  isActive: true;
  role: Exclude<RoleEnum, 'student' | 'hr'>;
}

interface UserOtherResponse extends UserResponseBase {
  isActive: boolean;
  role: Exclude<RoleEnum, 'admin'>;
}

export type UserResponse = UserAdminResponse | UserOtherResponse;
