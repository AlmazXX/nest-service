import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LocalPayload } from '../types/local-payload.type';

@Injectable()
export class RefreshGuard extends AuthGuard('refresh-jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = LocalPayload>(
    err: Error,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      if (!context.switchToHttp().getRequest<Request>().body?.refreshToken) {
        throw new UnauthorizedException();
      }

      if (
        info &&
        ['TokenExpiredError', 'JsonWebTokenError'].includes(info.name)
      ) {
        throw new ForbiddenException('Invalid refresh token');
      }
    }

    return user;
  }
}
