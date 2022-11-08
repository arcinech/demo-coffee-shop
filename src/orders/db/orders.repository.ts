import { dataSource } from '../../db/data-source';
import { Order } from './order.entity';

export const OrdersRepository = dataSource.getRepository(Order).extend({
  async updateUserAddress(
    orderId: string,
    newAddressId: string,
  ): Promise<Order> {
    await this.orderRepository.update(
      {
        id: orderId,
      },
      {
        userAddress: {
          id: newAddressId,
        },
      },
    );

    return this.orderRepository.findOne(orderId);
  },
});
