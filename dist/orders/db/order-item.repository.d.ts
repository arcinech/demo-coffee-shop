import { Product } from 'src/products/db/products.entity';
import { CreateOrderItemDto } from '../dto/create-order.dto';
import { OrderItem } from './order-item.entity';
export declare const OrderItemRepository: import("typeorm").Repository<OrderItem> & {
    deleteOrderItemsByOrderId(orderId: string): Promise<void>;
    addProductToOrder(orderId: string, createOrderItemDto: CreateOrderItemDto, product: Product): Promise<OrderItem>;
};
