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

@Controller('auth')
export class AuthController {
  constructor(
    private authDataService: AuthDataService,
    private emailValidator: EmailValidatorServiceService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() req): any {
    return req?.user;
  }

  @Post('/register')
  async registerUser(@Body() newUser: CreateUserDto): Promise<ExternalUserDto> {
    await this.emailValidator.validateUniqueEmail(newUser?.email);
    return this.authDataService.registerUser(newUser);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.session?.passport?.user;
  }
}
