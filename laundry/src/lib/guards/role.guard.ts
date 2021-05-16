import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomRequest, Role } from 'src/typings';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles =
      this.reflector.get<Role[]>('roles', context.getHandler()) || [];
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const { auth } = req;
    if (!auth) {
      return false;
    }
    if (roles.includes(auth.role)) {
      return true;
    }
    return false;
  }
}
