import { Module } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { User } from './db/user.entity';
import { UserValidatorService } from '../auth/user-validator.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersDataService, UserValidatorService, User],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersDataService],
})
export class UsersModule {}
