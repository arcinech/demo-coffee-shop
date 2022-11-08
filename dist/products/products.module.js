"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_data_service_1 = require("./products-data.service");
const typeorm_1 = require("@nestjs/typeorm");
const tag_entity_1 = require("./db/tag.entity");
const products_entity_1 = require("./db/products.entity");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController],
        providers: [products_data_service_1.ProductsDataService, products_entity_1.Product, tag_entity_1.Tag],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tag_entity_1.Tag]),
            typeorm_1.TypeOrmModule.forFeature([products_entity_1.Product]),
        ],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map