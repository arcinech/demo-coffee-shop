import { ProductImage } from './product-images.entity';
import { Tag } from './tag.entity';
export declare class Product {
    id: string;
    name: string;
    price: number;
    count: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    images: Array<ProductImage>;
}
