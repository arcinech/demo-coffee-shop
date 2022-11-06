import { Order } from 'src/orders/db/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({
  name: 'user_addresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  street: string;

  @Column({ type: 'int' })
  buildingNumber: number;

  @Column({ type: 'int', nullable: true })
  flatNumber: number;

  @Column({ length: 15 })
  zipCode: string;

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
