import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './db/order.entity';
import { OrderItem } from './db/order-item.entity';
import { UsersDataService } from 'src/users/users-data.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersDataService, Order, OrderItem],
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), UsersDataService],
})
export class OrdersModule {}
