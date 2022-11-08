import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './db/products.entity';
export declare class ProductsDataService {
    addProduct(newProduct: CreateProductDTO): Promise<Product>;
    updateProduct(id: string, product: UpdateProductDTO): Promise<Product>;
    deleteProductById(id: string): Promise<void>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
}
