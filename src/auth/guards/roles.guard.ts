import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../common/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && roles.some((role: UserRole) => user.userRole?.includes(role))) {
      return true;
    }
console.log('?????????/',user,roles);

    throw new UnauthorizedException(
      'UNAUTHORIZED',
      'You are not Authorized to Perform this Action',
    );
  }
}
