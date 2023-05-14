import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@enums/user-role.enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
