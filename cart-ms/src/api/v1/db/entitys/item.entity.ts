import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  userId: string;

  @Column('uuid', { nullable: false })
  cartId: string;

  @Column('uuid', { nullable: false })
  itemId: string;

  @Column('uuid', { nullable: false })
  serviceId: string;

  @Column('uuid', { nullable: false })
  serviceTypeId: string;

  @Column('int', { nullable: false, default: 0 })
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
