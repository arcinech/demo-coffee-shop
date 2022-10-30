import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersDataService } from './orders-data.service';
import { OrderItem } from './db/order-item.entity';
import { Orders } from './db/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ExternalOrderDto,
  ExternalOrderItemDto,
} from './dto/external-order.dto';
import { dateToArray } from '../shared/helpers/date.helper';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';

@Controller('orders')
export class OrdersController {
  constructor(private orderDataService: OrdersDataService) {}
  mapOrderToExternal(order: Orders): ExternalOrderDto {
    return {
      ...order,
      createdAt: dateToArray(order.createdAt),
      updatedAt: dateToArray(order.updatedAt),
      userFirstName: order.user.firstName,
      userLastName: order.user.lastName,
      userEmail: order.user.email,
      userAddress: order.address,
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

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addOrder(@Body() _order_: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderDataService.addOrder(_order_),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updateOrder(
    @Param('id') _id_: string,
    @Body() _order_: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderDataService.updateOrderById(_id_, _order_),
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
