export interface UserResponseBase {
  id: string;
  email: string;
}
interface UserAdminResponse extends UserResponseBase {
  isActive: true;
  role: 'admin';
}

interface UserOtherResponse extends UserResponseBase {
  isActive: boolean;
  role: 'hr' | 'student';
}

export type UserResponse = UserAdminResponse | UserOtherResponse;
