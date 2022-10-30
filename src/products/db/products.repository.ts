import { Product } from './products.entity';
import { dataSource } from '../../db/data-source';

export const ProductRepository = dataSource.getRepository(Product).extend({});
