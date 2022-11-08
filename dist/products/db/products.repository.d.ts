import { Product } from './products.entity';
export declare const ProductRepository: import("typeorm").Repository<Product> & {
    findProductsByIds(ids: number[]): Promise<Product[]>;
};
