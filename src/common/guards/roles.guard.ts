import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@enums/user-role.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(requiredRoles: UserRole[], userRole: UserRole): boolean {
    return requiredRoles.some((role) => userRole === role);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) return true;
    const user = context.switchToHttp().getRequest().user;
    if (!user) return false;
    return this.matchRoles(roles, user.role);
  }
}
