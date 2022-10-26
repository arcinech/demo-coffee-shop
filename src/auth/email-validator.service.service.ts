import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/db/user.repository';
import { UserRequireUniqueEmailException } from '../shared/exception/user-require-unique-email-exception';

@Injectable()
export class EmailValidatorServiceService {
  async validateUniqueEmail(email: string): Promise<void> {
    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
