import { OrdersDataService } from './orders-data.service';
import { OrderItem } from './db/order-item.entity';
import { Order } from './db/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto, ExternalOrderItemDto } from './dto/external-order.dto';
export declare class OrdersController {
    private orderDataService;
    constructor(orderDataService: OrdersDataService);
    mapOrderToExternal(order: Order): ExternalOrderDto;
    mapToExternalOrderItem(orderItem: OrderItem): ExternalOrderItemDto;
    newOrder(_order_: CreateOrderDto): Promise<ExternalOrderDto>;
    getOrderById(req: any, _id_: string): Promise<ExternalOrderDto>;
}
