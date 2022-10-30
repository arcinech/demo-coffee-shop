import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDataService } from '../auth-data.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authDataService: AuthDataService) {
    super();
    // { usernameField: 'email', passwordField: 'password' }
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authDataService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
