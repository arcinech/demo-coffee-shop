import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './db/products.entity';
export declare class ProductsController {
    private productRepository;
    constructor(productRepository: ProductsDataService);
    mapProductToExternal(product: Product): ExternalProductDto;
    getAllProducts(): Promise<Array<ExternalProductDto>>;
    getProductById(_id_: string): Promise<ExternalProductDto>;
    addProduct(_product_: CreateProductDTO): Promise<ExternalProductDto>;
    deleteProduct(_id_: string): Promise<void>;
    updateProduct(_id_: string, _product_: CreateProductDTO): Promise<ExternalProductDto>;
}
