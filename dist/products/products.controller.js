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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const create_product_dto_1 = require("./dto/create-product.dto");
const products_data_service_1 = require("./products-data.service");
const date_helper_1 = require("../shared/helpers/date.helper");
const role_guard_1 = require("../shared/guards/role.guard");
let ProductsController = class ProductsController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    mapProductToExternal(product) {
        var _a;
        return Object.assign(Object.assign({}, product), { createdAt: (0, date_helper_1.dateToArray)(product.createdAt), updatedAt: (0, date_helper_1.dateToArray)(product.updatedAt), tags: (_a = product.tags) === null || _a === void 0 ? void 0 : _a.map((i) => i.name) });
    }
    async getAllProducts() {
        const products = await this.productRepository.getAllProducts();
        return products.map((i) => this.mapProductToExternal(i));
    }
    async getProductById(_id_) {
        return this.mapProductToExternal(await this.productRepository.getProductById(_id_));
    }
    async addProduct(_product_) {
        return this.mapProductToExternal(await this.productRepository.addProduct(_product_));
    }
    async deleteProduct(_id_) {
        await this.productRepository.deleteProductById(_id_);
    }
    async updateProduct(_id_, _product_) {
        return this.mapProductToExternal(await this.productRepository.updateProduct(_id_, _product_));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('api/products'),
    __metadata("design:paramtypes", [products_data_service_1.ProductsDataService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map