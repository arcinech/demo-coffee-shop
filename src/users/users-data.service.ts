import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './db/user.entity';
import { dataSource } from 'src/db/data-source';
import { EntityManager } from 'typeorm';
import { Roles } from 'src/shared/enums/roles.enums';

@Injectable()
export class UsersDataService {
  async addUser(newUser: CreateUserDto): Promise<User> {
    return dataSource.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.email = newUser.email;
      userToSave.name = newUser.name;
      userToSave.phone = newUser.phone;
      userToSave.role = Roles['CUSTOMER'];

      return await manager.getRepository(User).save(userToSave);
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return dataSource.getRepository(User).findOneBy({ email: email });
  }
}
