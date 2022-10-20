import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from 'src/auth/exception/user-require-unique-email-exception';
import { UserRepository } from 'src/users/db/user.repository';

@Injectable()
export class UserValidatorService {
  async validateUniqueEmail(email: string): Promise<void> {
    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
