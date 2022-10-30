import { ConflictException } from '@nestjs/common';

export class UserPasswordOrEmailException extends ConflictException {
  constructor() {
    super('Password or email not correct!');
  }
}
