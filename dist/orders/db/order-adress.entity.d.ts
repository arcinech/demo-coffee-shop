import { Order } from 'src/orders/db/order.entity';
export declare class OrderAddress {
    id: string;
    country: string;
    city: string;
    street: string;
    buildingNumber: number;
    flatNumber: number;
    zipCode: string;
    order: Order;
}
