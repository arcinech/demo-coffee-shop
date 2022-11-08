import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class CreateOrderAddressDto {
    country: string;
    city: string;
    street: string;
    buildingNumber: number;
    flatNumber?: number;
    zipCode: string;
}
export declare class CreateOrderDto extends CreateUserDto {
    additionalInfo: string;
    items: CreateOrderItemDto[];
    address: CreateOrderAddressDto;
}
export declare class CreateOrderItemDto {
    productId: string;
    quantity: number;
    notes?: string;
}
