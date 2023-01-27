import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MyAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user: any, info: Error) {
    // don't throw 401 error when unauthenticated
    if (!user) return null;
    return user;
  }
}
