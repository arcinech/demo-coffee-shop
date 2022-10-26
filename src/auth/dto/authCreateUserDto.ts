import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  address?: Array<CreateUserAddressDto>;
}

export class CreateUserAddressDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  buildingNumber: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  flatNumber?: number;
}
