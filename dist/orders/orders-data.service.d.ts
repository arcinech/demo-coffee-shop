import { User } from 'src/users/db/user.entity';
import { OrderItem } from './db/order-item.entity';
import { Order } from './db/order.entity';
import { CreateOrderAddressDto, CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { UsersDataService } from 'src/users/users-data.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { OrderAddress } from './db/order-adress.entity';
import { UpdateOrderItemDto } from './dto/update-order.dto';
export declare class OrdersDataService {
    private usersDataService;
    constructor(usersDataService: UsersDataService);
    prepareOrderItemsToSave(orderItems: CreateOrderItemDto[] | UpdateOrderItemDto[], manager: any): Promise<OrderItem[]>;
    prepUser(userData: CreateUserDto): Promise<User>;
    prepAddress(address: CreateOrderAddressDto): Promise<OrderAddress>;
    newOrder(orderData: CreateOrderDto): Promise<Order>;
    getOrderById(id: string): Promise<Order>;
}
