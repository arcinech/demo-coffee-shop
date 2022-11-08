import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './db/order.entity';
import { OrderItem } from './db/order-item.entity';
import { UsersModule } from 'src/users/users.module';
import { OrderAddress } from './db/order-adress.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersDataService, Order, OrderItem, OrderAddress],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, OrderAddress]),
    UsersModule,
  ],
})
export class OrdersModule {}
