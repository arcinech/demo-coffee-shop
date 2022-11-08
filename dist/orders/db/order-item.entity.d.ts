import { Product } from '../../products/db/products.entity';
import { Order } from './order.entity';
export declare class OrderItem {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    price: number;
    notes: string;
    order: Order;
    product: Product;
}
