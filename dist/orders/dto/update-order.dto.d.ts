import { UpdateUserDto } from 'src/users/dto/update-user.dto';
export declare class UpdateOrderDto extends UpdateUserDto {
    additionalInfo: string;
    orderItems: UpdateOrderItemDto[];
    address: UpdateOrderAddressDto;
}
export declare class UpdateOrderItemDto {
    productId: string;
    quantity: number;
    notes?: string;
}
export declare class UpdateOrderAddressDto {
    country: string;
    city: string;
    street: string;
    buildingNumber: number;
    flatNumber?: number;
    zipCode: string;
}
