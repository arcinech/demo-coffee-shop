"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitData1667813456192 = void 0;
const products_entity_1 = require("../../products/db/products.entity");
const data_source_1 = require("../data-source");
const tag_entity_1 = require("../../products/db/tag.entity");
const faker_1 = require("@faker-js/faker");
const product_images_entity_1 = require("../../products/db/product-images.entity");
class InitData1667813456192 {
    async up(queryRunner) {
        const tags = await this.saveTags();
        await this.saveProducts(tags);
    }
    async down(queryRunner) {
        return null;
    }
    async saveTags() {
        const tagsArr = [];
        const tags = [{ name: 'NEW' }, { name: 'PROMO' }, { name: 'LAST_ITEMS' }];
        for (const tag of tags) {
            const tagToSave = new tag_entity_1.Tag();
            tagToSave.name = tag.name;
            tagsArr.push(await data_source_1.dataSource.getRepository(tag_entity_1.Tag).save(tagToSave));
        }
        console.log('Tags saved');
        return tagsArr;
    }
    async imageNames() {
        const imageNames = [];
        const randomIncrement = Math.floor(Math.random() * 10);
        for (let i = randomIncrement; i < randomIncrement + 5; i++) {
            await data_source_1.dataSource.transaction(async (manager) => {
                const imageToSave = new product_images_entity_1.ProductImage();
                imageToSave.url = `coffee_images-(${i}).jpg`;
                imageNames.push(await manager.getRepository(product_images_entity_1.ProductImage).save(imageToSave));
                console.log('Image saved:, imageNames.length');
            });
        }
        return imageNames;
    }
    async saveProducts(tags) {
        const products = [];
        for (let i = 0; i < 20; i++) {
            await data_source_1.dataSource.transaction(async (manager) => {
                const productToSave = new products_entity_1.Product();
                productToSave.name = `Coffee ${i}`;
                productToSave.count = Number(faker_1.faker.datatype.number({ min: 0, max: 100 }));
                productToSave.price = Number(faker_1.faker.commerce.price(1, 150));
                productToSave.tags = faker_1.faker.helpers.arrayElements(tags);
                productToSave.images = await this.imageNames();
                productToSave.description = faker_1.faker.lorem.paragraph();
                products.push(await manager.getRepository(products_entity_1.Product).save(productToSave));
                console.log('Products saved:, products.length');
            });
        }
        return products;
    }
}
exports.InitData1667813456192 = InitData1667813456192;
//# sourceMappingURL=1667813456192-InitData.js.map