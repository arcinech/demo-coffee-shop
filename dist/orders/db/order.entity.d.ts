import { OrderItem } from './order-item.entity';
import { Status } from '../enums/status.enums';
import { User } from '../../users/db/user.entity';
import { OrderAddress } from './order-adress.entity';
export declare class Order {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    orderItems?: OrderItem[];
    status: Status;
    user: User;
    additionalInfo: string;
    address: OrderAddress;
    total: number;
}
