import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Status } from '../enums/status.enums';
import { User } from '../../users/db/user.entity';
import { OrderAddress } from './order-adress.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
  })
  orderItems?: OrderItem[];

  @Column('enum', {
    enum: Status,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @Column({ type: 'text', nullable: true })
  additionalInfo: string;

  @ManyToOne(() => OrderAddress, (orderAddress) => orderAddress.id, {
    eager: true,
  })
  address: OrderAddress;

  @Column({ type: 'float' })
  total: number;
}
