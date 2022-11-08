import { Product } from 'src/products/db/products.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../data-source';
import { Tag } from '../../products/db/tag.entity';
import { faker } from '@faker-js/faker';
import { ProductImage } from 'src/products/db/product-images.entity';

export class InitData1667813456192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = await this.saveTags();
    await this.saveProducts(tags);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return null;
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [{ name: 'NEW' }, { name: 'PROMO' }, { name: 'LAST_ITEMS' }];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await dataSource.getRepository(Tag).save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async imageNames(): Promise<ProductImage[]> {
    const imageNames: ProductImage[] = [];
    const randomIncrement = Math.floor(Math.random() * 10);
    for (let i = randomIncrement; i < randomIncrement + 5; i++) {
      await dataSource.transaction(async (manager) => {
        const imageToSave = new ProductImage();

        imageToSave.url = `coffee_images-(${i}).jpg`;

        imageNames.push(
          await manager.getRepository(ProductImage).save(imageToSave),
        );
        console.log('Image saved:, imageNames.length');
      });
    }

    return imageNames;
  }

  private async saveProducts(tags: Tag[]): Promise<Product[]> {
    const products: Product[] = [];
    for (let i = 0; i < 20; i++) {
      await dataSource.transaction(async (manager) => {
        const productToSave = new Product();

        productToSave.name = `Coffee ${i}`;
        productToSave.count = Number(
          faker.datatype.number({ min: 0, max: 100 }),
        );
        productToSave.price = Number(faker.commerce.price(1, 150));
        productToSave.tags = faker.helpers.arrayElements(tags);

        productToSave.images = await this.imageNames();
        productToSave.description = faker.lorem.paragraph();

        products.push(await manager.getRepository(Product).save(productToSave));
        console.log('Products saved:, products.length');
      });
    }

    return products;
  }
}
