import { Injectable } from '@nestjs/common';
import { User } from 'src/users/db/user.entity';
import { UsersDataService } from 'src/users/users-data.service';
import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm/data-source/DataSource';
import { UserPasswordOrEmailException } from 'src/shared/exception/user-password-or-email-exception';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthDataService {
  constructor(
    private usersDataService: UsersDataService,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    passwordSent: string,
  ): Promise<Omit<User, 'password'>> {
    // let match = false;
    const { password, ...user } = await this.usersDataService.findOneByEmail(
      email,
    );
    await console.log(
      'email: ',
      email,
      'hash: ',
      password,
      'password',
      passwordSent,
    );
    // if password is not null check if it matches
    // if (password && passwordSent) {
    //   match = await bcrypt.compareSync(passwordSent, password);
    // }
    if (user) {
      return user;
    }
    new UserPasswordOrEmailException();
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
