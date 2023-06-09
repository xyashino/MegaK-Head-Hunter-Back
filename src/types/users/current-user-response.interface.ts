import { UserResponseBase } from './user-response.interface';

interface UserCurrentAdminResponse extends UserResponseBase {
  isActive: true;
  role: 'admin';
  data: null;
}
interface UserCurrentHrResponse extends UserResponseBase {
  role: 'hr';
  isActive: boolean;
  data: {
    id: string;
    fullName: string;
  };
}

interface UserCurrentStudentResponse extends UserResponseBase {
  role: 'student';
  isActive: boolean;
  data: {
    id: string;
    fullName: string;
    githubUsername: string;
  };
}

export type CurrentUserResponse =
  | UserCurrentHrResponse
  | UserCurrentAdminResponse
  | UserCurrentStudentResponse;
