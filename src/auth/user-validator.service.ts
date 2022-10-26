import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from 'src/shared/exception/user-require-unique-email-exception';
import { UserRepository } from 'src/users/db/user.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserValidatorService {
  constructor(private dataSource: DataSource) {}
  async validateUniqueEmail(email: string): Promise<void> {
    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
