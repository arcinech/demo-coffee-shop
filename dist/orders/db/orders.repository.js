"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const data_source_1 = require("../../db/data-source");
const order_entity_1 = require("./order.entity");
exports.OrdersRepository = data_source_1.dataSource.getRepository(order_entity_1.Order).extend({
    async updateUserAddress(orderId, newAddressId) {
        await this.orderRepository.update({
            id: orderId,
        }, {
            userAddress: {
                id: newAddressId,
            },
        });
        return this.orderRepository.findOne(orderId);
    },
});
//# sourceMappingURL=orders.repository.js.map