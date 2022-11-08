"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDataService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./db/products.repository");
const tag_repository_1 = require("./db/tag.repository");
const products_entity_1 = require("./db/products.entity");
const data_source_1 = require("../db/data-source");
let ProductsDataService = class ProductsDataService {
    async addProduct(newProduct) {
        return data_source_1.dataSource.transaction(async (manager) => {
            const productToSave = new products_entity_1.Product();
            productToSave.name = newProduct.name;
            productToSave.count = newProduct.count;
            productToSave.price = newProduct.price;
            productToSave.tags = await tag_repository_1.TagRepository.findTagsByName(newProduct.tags);
            return await manager.getRepository(products_entity_1.Product).save(productToSave);
        });
    }
    async updateProduct(id, product) {
        return data_source_1.dataSource.transaction(async (manager) => {
            const productToUpdate = await manager
                .getRepository(products_entity_1.Product)
                .findOneBy({ id: id });
            productToUpdate.name = product.name;
            productToUpdate.count = product.count;
            productToUpdate.price = product.price;
            productToUpdate.tags = await tag_repository_1.TagRepository.findTagsByName(product.tags);
            return await manager.getRepository(products_entity_1.Product).save(productToUpdate);
        });
    }
    async deleteProductById(id) {
        products_repository_1.ProductRepository.delete(id);
    }
    getAllProducts() {
        return products_repository_1.ProductRepository.find();
    }
    getProductById(id) {
        return products_repository_1.ProductRepository.findOne({ where: { id: id } });
    }
};
ProductsDataService = __decorate([
    (0, common_1.Injectable)()
], ProductsDataService);
exports.ProductsDataService = ProductsDataService;
//# sourceMappingURL=products-data.service.js.map