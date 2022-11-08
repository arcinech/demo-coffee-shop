"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRepository = void 0;
const products_entity_1 = require("../../products/db/products.entity");
const data_source_1 = require("../../db/data-source");
const order_item_entity_1 = require("./order-item.entity");
const order_entity_1 = require("./order.entity");
exports.OrderItemRepository = data_source_1.dataSource.getRepository(order_item_entity_1.OrderItem).extend({
    async deleteOrderItemsByOrderId(orderId) {
        const orderProducts = await this.find({
            where: {
                order: orderId,
            },
        });
        await this.remove(orderProducts);
    },
    async addProductToOrder(orderId, createOrderItemDto, product) {
        return this.transaction(async (manager) => {
            const orderItem = new order_item_entity_1.OrderItem();
            orderItem.order = new order_entity_1.Order();
            orderItem.order.id = orderId;
            orderItem.product = new products_entity_1.Product();
            orderItem.product.id = product.id;
            orderItem.price = product.price;
            orderItem.quantity = createOrderItemDto.quantity;
            return await manager.withRepository(exports.OrderItemRepository).save(orderItem);
        });
    },
});
//# sourceMappingURL=order-item.repository.js.map