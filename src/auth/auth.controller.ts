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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersDataService } from 'src/users/users-data.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authDataService: AuthDataService,
    private emailValidator: EmailValidatorServiceService,
    private userDataService: UsersDataService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Request() req): Promise<any> {
    return this.authDataService.login(req?.user);
  }

  @Post('/register')
  async registerUser(@Body() newUser: CreateUserDto): Promise<ExternalUserDto> {
    await this.emailValidator.validateUniqueEmail(newUser?.email);
    return this.authDataService.registerUser(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return this.userDataService.findOneByEmail(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logoutUser(@Request() req): Promise<void> {
    return this.authDataService.logoutUser(req?.user);
  }
}
