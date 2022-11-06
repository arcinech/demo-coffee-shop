import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersDataService } from './orders-data.service';
import { OrderItem } from './db/order-item.entity';
import { Order } from './db/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ExternalOrderDto,
  ExternalOrderItemDto,
} from './dto/external-order.dto';
import { dateToArray } from '../shared/helpers/date.helper';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';

@Controller('orders')
export class OrdersController {
  constructor(private orderDataService: OrdersDataService) {}
  mapOrderToExternal(order: Order): ExternalOrderDto {
    return {
      ...order,
      createdAt: dateToArray(order.createdAt),
      updatedAt: dateToArray(order.updatedAt),
      userName: order.user.name,
      userEmail: order.user.email,
      userPhone: order.user.phone,
      userAddress: order.address,
      additionalInfo: order.additionalInfo,
      orderItems: order.orderItems.map((item) =>
        this.mapToExternalOrderItem(item),
      ),
    };
  }

  mapToExternalOrderItem(orderItem: OrderItem): ExternalOrderItemDto {
    return {
      ...orderItem,
      productId: orderItem.product.id,
      productName: orderItem.product.name,
    };
  }

  @Post()
  async newOrder(@Body() _order_: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderDataService.newOrder(_order_),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getProductById(
    @Request() req: any,
    @Param('id') _id_: string,
  ): Promise<ExternalOrderDto> {
    const order = await this.orderDataService.getOrderById(_id_);
    if (order.user.id === req.session.user.id) {
      return this.mapOrderToExternal(order);
    }
    throw new Error(`You don't have access to this order`);
  }
}
