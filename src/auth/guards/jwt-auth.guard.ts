import { ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, isAuthenticated, info) {
    if (err || !isAuthenticated) {
      if (info && info.message) {
        if (info.message === 'No auth token') {
          throw new UnauthorizedException('MISSING_AUTH_TOKEN');
        } else if (info.message === 'invalid signature') {
          throw new UnauthorizedException('INVALID_TOKEN');
        } else if (info.message === 'jwt expired') {
          throw new UnauthorizedException('EXPIRED_TOKEN');
        }
      }

      throw new UnauthorizedException('UNAUTHORIZED');
    }
    return isAuthenticated;
  }
}
