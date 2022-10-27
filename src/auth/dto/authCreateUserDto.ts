import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsInt,
  IsOptional,
} from 'class-validator';
import {
  CreateUserDto,
  CreateUserAddressDto,
} from 'src/users/dto/create-user.dto';

export class AuthCreateUserDto extends CreateUserDto {
  constructor() {
    super();
  }

  @ValidateNested({ each: true })
  @Type(() => AuthCreateUserAddressDto)
  address?: Array<AuthCreateUserAddressDto>;
}

export class AuthCreateUserAddressDto extends CreateUserAddressDto {
  constructor() {
    super();
  }
}
