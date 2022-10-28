import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from '../enums/roles.enums';

@Injectable()
export class WorkerRoles implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const session = request?.session?.user.role;
    if (session === Roles['ADMIN'] || session === Roles['SELLER']) {
      return request.isAuthenticated();
    }
    throw new UnauthorizedException();
  }
}
