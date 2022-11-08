import { Order } from './order.entity';
export declare const OrdersRepository: import("typeorm").Repository<Order> & {
    updateUserAddress(orderId: string, newAddressId: string): Promise<Order>;
};
