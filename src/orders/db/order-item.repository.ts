import { Product } from 'src/products/db/products.entity';
import { dataSource } from 'src/db/data-source';
import { CreateOrderItemDto } from '../dto/create-order.dto';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';

export const OrderItemRepository = dataSource.getRepository(OrderItem).extend({
  async deleteOrderItemsByOrderId(orderId: string): Promise<void> {
    const orderProducts = await this.find({
      where: {
        order: orderId,
      },
    });

    await this.remove(orderProducts);
  },

  async addProductToOrder(
    orderId: string,
    createOrderItemDto: CreateOrderItemDto,
    product: Product,
  ): Promise<OrderItem> {
    return this.transaction(async (manager) => {
      const orderItem = new OrderItem();

      orderItem.order = new Order();
      orderItem.order.id = orderId;
      orderItem.product = new Product();
      orderItem.product.id = product.id;
      orderItem.price = product.price;
      orderItem.quantity = createOrderItemDto.quantity;

      return await manager.withRepository(OrderItemRepository).save(orderItem);
    });
  },
});
