import { Injectable } from '@nestjs/common';
import { User } from 'src/users/db/user.entity';
import { UsersDataService } from 'src/users/users-data.service';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm/data-source/DataSource';
import { UserPasswordOrEmailException } from 'src/shared/exception/user-password-or-email-exception';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthDataService {
  constructor(private usersDataService: UsersDataService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersDataService.findOneByEmail(email);
    const match = await bcrypt.compare(password, user?.password);
    if (!user || !match) {
      new UserPasswordOrEmailException();
    }
    return user;
  }

  async registerUser(newUser: CreateUserDto): Promise<Omit<User, 'password'>> {
    const registerUser = await this.usersDataService.addUser(newUser);
    if (!registerUser) {
      throw Error('User not created');
    }
    return registerUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersDataService.deleteUserById(id);
  }
}
