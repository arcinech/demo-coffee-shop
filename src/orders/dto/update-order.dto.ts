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
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export class UpdateOrderDto extends UpdateUserDto {
  @IsOptional()
  @MaxLength(255)
  additionalInfo: string;

  @IsOptional()
  @IsArray()
  orderItems: UpdateOrderItemDto[];

  @Type(() => UpdateOrderAddressDto)
  address: UpdateOrderAddressDto;
}

export class UpdateOrderItemDto {
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

export class UpdateOrderAddressDto {
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
