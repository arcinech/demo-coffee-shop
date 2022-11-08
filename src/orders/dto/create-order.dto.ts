import {
  IsNotEmpty,
  IsInt,
  Min,
  MaxLength,
  IsArray,
  IsUUID,
  IsOptional,
  Max,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateOrderAddressDto {
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

  @IsNotEmpty()
  zipCode: string;
}

export class CreateOrderDto extends CreateUserDto {
  @IsOptional()
  @MaxLength(255)
  additionalInfo: string;

  @IsOptional()
  @IsArray()
  items: CreateOrderItemDto[];

  @Type(() => CreateOrderAddressDto)
  address: CreateOrderAddressDto;
}

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
