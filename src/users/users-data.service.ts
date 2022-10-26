import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-user.dto';
import { User } from './db/user.entity';
import { UpdateUserAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { UserAddress } from './db/userAddress.entity';
import { dataSource } from 'src/db/data-source';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserPasswordOrEmailException } from 'src/shared/exception/user-password-or-email-exception';

@Injectable()
export class UsersDataService {
  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
    manager: EntityManager,
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.buildingNumber = add.buildingNumber;
      addressToSave.flatNumber = add?.flatNumber;

      addresses.push(
        await manager.withRepository(UserAddressRepository).save(addressToSave),
      );
    }

    return addresses;
  }

  async addUser(newUser: CreateUserDto): Promise<Omit<User, 'password'>> {
    return dataSource.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.firstName = newUser.firstName;
      userToSave.lastName = newUser.lastName;
      userToSave.email = newUser.email;
      userToSave.password = await bcrypt.hash(newUser.password, 10);
      userToSave.role = newUser.role;

      userToSave.address = await this.prepareUserAddressesToSave(
        newUser.address,
        manager,
      );

      return await manager.getRepository(User).save(userToSave);
    });
  }

  async updateUserById(id: string, updatedUser: UpdateUserDto): Promise<User> {
    return dataSource.transaction(async (manager: EntityManager) => {
      const userManager = manager.withRepository(UserRepository);
      await manager
        .withRepository(UserAddressRepository)
        .deleteUserAddressesByUserId(id);

      const userToUpdate = await userManager.findOne({
        where: { id: id },
      });

      userToUpdate.firstName = updatedUser.firstName;
      userToUpdate.lastName = updatedUser.lastName;
      userToUpdate.email = updatedUser.email;
      userToUpdate.role = updatedUser.role;
      userToUpdate.birthdate = userToUpdate.birthdate;
      userToUpdate.address = await this.prepareUserAddressesToSave(
        userToUpdate.address,
        manager,
      );

      return await userManager.save(userToUpdate);
    });
  }

  async deleteUserById(id: string): Promise<void> {
    UserRepository.delete(id);
  }

  getUserById(id: string): Promise<User> {
    return UserRepository.findOne({
      where: { id: id },
    });
  }

  getAllUsers(): Promise<User[]> {
    return UserRepository.find();
  }

  findOneByEmail(email: string): Promise<User> {
    const user = UserRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new UserPasswordOrEmailException();
    }
    return user;
  }
}
