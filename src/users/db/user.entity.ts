import { Roles } from 'src/shared/enums/roles.enums';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50 })
  phone: string;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;
}
