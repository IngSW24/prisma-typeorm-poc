import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Auth guard example, ideally this will check
 * the JWT against the secret key shared with Auth0/Cognito
 * or other providers unless we also handle user storage
 */

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers['authorization']?.includes('test')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    return true;
  }
}
