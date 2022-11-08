import { Status } from '../enums/status.enums';
export declare class ExternalOrderDto {
    id: string;
    orderItems: ExternalOrderItemDto[];
    status: Status;
    additionalInfo: string;
    userName: string;
    userPhone: string;
    userEmail: string;
    createdAt: number[];
    updatedAt: number[];
    total: number;
}
export declare class ExternalOrderItemDto {
    id: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    notes: string;
}
