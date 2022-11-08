import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './products.entity';

@Entity({
  name: 'product_images',
})
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
