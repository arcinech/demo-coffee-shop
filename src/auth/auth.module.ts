import { Module } from '@nestjs/common';
import { AuthDataService } from './auth-data.service';
import { EmailValidatorServiceService } from './email-validator.service.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthDataService, EmailValidatorServiceService],
  controllers: [AuthController]
})
export class AuthModule {}
