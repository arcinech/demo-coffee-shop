import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ExternalUserDto } from 'src/users/dto/external-user.dto';
import { AuthDataService } from './auth-data.service';
import { EmailValidatorServiceService } from './email-validator.service.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { User } from 'src/users/db/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authDataService: AuthDataService,
    private emailValidator: EmailValidatorServiceService,
  ) {}

  mapUserToExternal(user: User): ExternalUserDto {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() req): any {
    return req?.user;
  }

  @Post('/register')
  async registerUser(@Body() newUser: CreateUserDto): Promise<void> {
    await this.emailValidator.validateUniqueEmail(newUser?.email);
    await this.authDataService.registerUser(newUser);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return this.mapUserToExternal(req.session?.passport?.user);
  }
}
