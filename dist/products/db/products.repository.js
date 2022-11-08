"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const products_entity_1 = require("./products.entity");
const data_source_1 = require("../../db/data-source");
exports.ProductRepository = data_source_1.dataSource.getRepository(products_entity_1.Product).extend({
    async findProductsByIds(ids) {
        return await this.find({ where: { id: ids } });
    },
});
//# sourceMappingURL=products.repository.js.map