import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/db/products.entity';
import { User } from 'src/users/db/user.entity';
import { In } from 'typeorm';
import { dataSource } from '../db/data-source';
import { OrderItem } from './db/order-item.entity';
import { Order } from './db/order.entity';
import {
  CreateOrderAddressDto,
  CreateOrderDto,
  CreateOrderItemDto,
} from './dto/create-order.dto';
import { ProductRepository } from 'src/products/db/products.repository';
import { UsersDataService } from 'src/users/users-data.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { OrderAddress } from './db/order-adress.entity';
import { UpdateOrderItemDto } from './dto/update-order.dto';

@Injectable()
export class OrdersDataService {
  constructor(private usersDataService: UsersDataService) {}
  async prepareOrderItemsToSave(
    orderItems: CreateOrderItemDto[] | UpdateOrderItemDto[],
    manager,
  ): Promise<OrderItem[]> {
    const itemsListToSave: OrderItem[] = [];

    const productsIds: string[] = await orderItems?.map(
      (item) => item.productId,
    );

    const products: Product[] = await manager
      .withRepository(ProductRepository)
      .find({ where: { id: In(productsIds) } });

    if (orderItems.length > 0 && products.length === 0) {
      throw new Error(orderItems?.map((item) => item.productId).join(' '));
    }

    for (const add of products) {
      const orderItemToSave = new OrderItem();
      orderItemToSave.product = new Product();
      orderItemToSave.product.id = add?.id;

      orderItemToSave.price = add?.price;

      orderItemToSave.quantity = orderItems?.find(
        (item) => item.productId === add.id,
      )?.quantity;

      orderItemToSave.notes = orderItems?.find(
        (item) => item.productId === add.id,
      )?.notes;

      itemsListToSave.push(
        await manager.getRepository(OrderItem).save(orderItemToSave),
      );
    }

    return itemsListToSave;
  }
  async prepUser(userData: CreateUserDto): Promise<User> {
    const user = await dataSource.getRepository(User).findOne({
      where: {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
      },
    });

    if (!user) {
      const newUser = await this.usersDataService.addUser(userData);
      return newUser;
    }

    return user;
  }

  async prepAddress(address: CreateOrderAddressDto): Promise<OrderAddress> {
    const addressExists = await dataSource.getRepository(OrderAddress).findOne({
      where: {
        city: address.city,
        street: address.street,
        buildingNumber: address.buildingNumber,
        flatNumber: address.flatNumber,
        zipCode: address.zipCode,
        country: address.country,
      },
    });

    if (!addressExists) {
      return dataSource.transaction(async (manager) => {
        const newAddress = new OrderAddress();
        newAddress.city = address.city;
        newAddress.street = address.street;
        newAddress.buildingNumber = address.buildingNumber;
        newAddress.flatNumber = address.flatNumber;
        newAddress.zipCode = address.zipCode;
        newAddress.country = address.country;

        return await manager.getRepository(OrderAddress).save(newAddress);
      });
    }

    return addressExists;
  }

  async newOrder(orderData: CreateOrderDto): Promise<Order> {
    console.log(orderData);
    return dataSource.transaction(async (manager) => {
      const orderToSave = new Order();

      const user = await this.prepUser({
        email: orderData.email,
        name: orderData.name,
        phone: orderData.phone,
      });

      const checkAddress = await this.prepAddress(orderData.address);

      orderToSave.user = new User();
      orderToSave.user.id = user.id;

      orderToSave.address = new OrderAddress();
      orderToSave.address.id = checkAddress.id;

      orderToSave.additionalInfo = orderData.additionalInfo;

      orderToSave.orderItems = await this.prepareOrderItemsToSave(
        orderData.items,
        manager,
      );

      orderToSave.total = orderToSave.orderItems.reduce(
        (total, items) => total + items.price * items.quantity,
        0,
      );

      return await manager.getRepository(Order).save(orderToSave);
    });
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await dataSource.getRepository(Order).findOneBy({ id: id });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
