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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersDataService = void 0;
const common_1 = require("@nestjs/common");
const products_entity_1 = require("../products/db/products.entity");
const user_entity_1 = require("../users/db/user.entity");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../db/data-source");
const order_item_entity_1 = require("./db/order-item.entity");
const order_entity_1 = require("./db/order.entity");
const products_repository_1 = require("../products/db/products.repository");
const users_data_service_1 = require("../users/users-data.service");
const order_adress_entity_1 = require("./db/order-adress.entity");
let OrdersDataService = class OrdersDataService {
    constructor(usersDataService) {
        this.usersDataService = usersDataService;
    }
    async prepareOrderItemsToSave(orderItems, manager) {
        var _a, _b;
        const itemsListToSave = [];
        const productsIds = await (orderItems === null || orderItems === void 0 ? void 0 : orderItems.map((item) => item.productId));
        const products = await manager
            .withRepository(products_repository_1.ProductRepository)
            .find({ where: { id: (0, typeorm_1.In)(productsIds) } });
        if (orderItems.length > 0 && products.length === 0) {
            throw new Error(orderItems === null || orderItems === void 0 ? void 0 : orderItems.map((item) => item.productId).join(' '));
        }
        for (const add of products) {
            const orderItemToSave = new order_item_entity_1.OrderItem();
            orderItemToSave.product = new products_entity_1.Product();
            orderItemToSave.product.id = add === null || add === void 0 ? void 0 : add.id;
            orderItemToSave.price = add === null || add === void 0 ? void 0 : add.price;
            orderItemToSave.quantity = (_a = orderItems === null || orderItems === void 0 ? void 0 : orderItems.find((item) => item.productId === add.id)) === null || _a === void 0 ? void 0 : _a.quantity;
            orderItemToSave.notes = (_b = orderItems === null || orderItems === void 0 ? void 0 : orderItems.find((item) => item.productId === add.id)) === null || _b === void 0 ? void 0 : _b.notes;
            itemsListToSave.push(await manager.getRepository(order_item_entity_1.OrderItem).save(orderItemToSave));
        }
        return itemsListToSave;
    }
    async prepUser(userData) {
        const user = await data_source_1.dataSource.getRepository(user_entity_1.User).findOne({
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
    async prepAddress(address) {
        const addressExists = await data_source_1.dataSource.getRepository(order_adress_entity_1.OrderAddress).findOne({
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
            return data_source_1.dataSource.transaction(async (manager) => {
                const newAddress = new order_adress_entity_1.OrderAddress();
                newAddress.city = address.city;
                newAddress.street = address.street;
                newAddress.buildingNumber = address.buildingNumber;
                newAddress.flatNumber = address.flatNumber;
                newAddress.zipCode = address.zipCode;
                newAddress.country = address.country;
                return await manager.getRepository(order_adress_entity_1.OrderAddress).save(newAddress);
            });
        }
        return addressExists;
    }
    async newOrder(orderData) {
        console.log(orderData);
        return data_source_1.dataSource.transaction(async (manager) => {
            const orderToSave = new order_entity_1.Order();
            const user = await this.prepUser({
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone,
            });
            const checkAddress = await this.prepAddress(orderData.address);
            orderToSave.user = new user_entity_1.User();
            orderToSave.user.id = user.id;
            orderToSave.address = new order_adress_entity_1.OrderAddress();
            orderToSave.address.id = checkAddress.id;
            orderToSave.additionalInfo = orderData.additionalInfo;
            orderToSave.orderItems = await this.prepareOrderItemsToSave(orderData.items, manager);
            orderToSave.total = orderToSave.orderItems.reduce((total, items) => total + items.price * items.quantity, 0);
            return await manager.getRepository(order_entity_1.Order).save(orderToSave);
        });
    }
    async getOrderById(id) {
        const order = await data_source_1.dataSource.getRepository(order_entity_1.Order).findOneBy({ id: id });
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
};
OrdersDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_data_service_1.UsersDataService])
], OrdersDataService);
exports.OrdersDataService = OrdersDataService;
//# sourceMappingURL=orders-data.service.js.map