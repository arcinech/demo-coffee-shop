import { Roles } from '../../shared/enums/roles.enums';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsEnum(Roles)
  role: Roles;
}
