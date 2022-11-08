import { Product } from './products.entity';
import { dataSource } from '../../db/data-source';

export const ProductRepository = dataSource.getRepository(Product).extend({
  async findProductsByIds(ids: number[]): Promise<Product[]> {
    return await this.find({ where: { id: ids } });
  },
});
