import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/db/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ExternalUserDto } from 'src/users/dto/external-user.dto';
import { AuthDataService } from './auth-data.service';
import { EmailLoginDto } from './dto/emailLogin.dto';
import { EmailValidatorServiceService } from './email-validator.service.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authDataService: AuthDataService,
    private emailValidator: EmailValidatorServiceService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Body() { email, password }: EmailLoginDto,
  ): Promise<Omit<User, 'password'>> {
    return this.authDataService.validateUser(email, password);
  }

  @Post('/register')
  async registerUser(@Body() newUser: CreateUserDto): Promise<ExternalUserDto> {
    await this.emailValidator.validateUniqueEmail(newUser?.email);
    return this.authDataService.registerUser(newUser);
  }
}
