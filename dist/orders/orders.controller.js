"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_data_service_1 = require("./orders-data.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const date_helper_1 = require("../shared/helpers/date.helper");
const authenticated_guard_1 = require("../shared/guards/authenticated.guard");
let OrdersController = class OrdersController {
    constructor(orderDataService) {
        this.orderDataService = orderDataService;
    }
    mapOrderToExternal(order) {
        return Object.assign(Object.assign({}, order), { createdAt: (0, date_helper_1.dateToArray)(order.createdAt), updatedAt: (0, date_helper_1.dateToArray)(order.updatedAt), userName: order.user.name, userEmail: order.user.email, userPhone: order.user.phone, orderItems: order.orderItems.map((item) => this.mapToExternalOrderItem(item)) });
    }
    mapToExternalOrderItem(orderItem) {
        return Object.assign(Object.assign({}, orderItem), { productId: orderItem.product.id, productName: orderItem.product.name });
    }
    async newOrder(_order_) {
        return this.mapOrderToExternal(await this.orderDataService.newOrder(_order_));
    }
    async getOrderById(req, _id_) {
        const order = await this.orderDataService.getOrderById(_id_);
        if (order.user.id === req.session.user.id) {
            return this.mapOrderToExternal(order);
        }
        throw new Error(`You don't have access to this order`);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "newOrder", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderById", null);
OrdersController = __decorate([
    (0, common_1.Controller)('api/orders'),
    __metadata("design:paramtypes", [orders_data_service_1.OrdersDataService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map