import { Body, Controller } from '@nestjs/common';
import { ExternalUserDto } from 'src/users/dto/external-user.dto';
import { UsersDataService } from 'src/users/users-data.service';
import { AuthDataService } from './auth-data.service';
import { EmailLoginDto } from './dto/emailLogin.dto';
import { EmailValidatorServiceService } from './email-validator.service.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersDataService: UsersDataService,
    private authDataService: AuthDataService,
    private emailValidator: EmailValidatorServiceService,
    private usersController: UsersController,
  ) {}

  @Post('/login')
  async loginUser(
    @Body() { email, password }: EmailLoginDto,
  ): Promise<ExternalUserDto> {
    return this.authDataService.loginUser(email, password);
  }
}
