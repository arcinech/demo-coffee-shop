import { Injectable } from '@nestjs/common';
import { User } from 'src/users/db/user.entity';
import { UsersDataService } from 'src/users/users-data.service';
import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm/data-source/DataSource';

@Injectable()
export class AuthDataService {
  constructor(
    private usersDataService: UsersDataService,
    private dataSource: DataSource,
  ) {}

  async loginUser(email: string, passwordSent: string): Promise<string> {
    const { password, ...user } = await this.dataSource
      .getRepository(User)
      .findOneBy({ email: email });
    const match = await bcrypt.compareSync(passwordSent, password);
    if (user && match) {
      return user.id;
    }
    return null;
  }
}
