import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  HttpCode,
  ParseUUIDPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { ExternalUserDto } from './dto/external-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './db/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from '../auth/user-validator.service';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersRepository: UsersDataService,
    private usersValidators: UserValidatorService,
  ) {}

  mapUserToExternal(user: User): ExternalUserDto {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(
    @Request() req,
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<void> {
    await this.usersValidators.validateUserPermission(
      _id_,
      req.session?.user?.id,
    );
    await this.usersRepository.deleteUserById(_id_);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updateUser(
    @Request() req,
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() _user_: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    await this.usersValidators.validateUserPermission(
      _id_,
      req.session?.user?.id,
    );
    return this.mapUserToExternal(
      await this.usersRepository.updateUserById(_id_, _user_),
    );
  }
}
