import { Tags } from '../enums/tags.enums';
export declare class CreateProductDTO {
    name: string;
    price: number;
    count: number;
    tags: Array<Tags>;
}
