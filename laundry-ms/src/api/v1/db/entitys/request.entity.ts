import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'laundry_request' })
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  userId: string;

  @Column('text', { nullable: false })
  cartId: string;

  @Column('int', { nullable: false })
  timingId: number;

  @Column('enum', { enum: ['cod'], default: 'cod', nullable: false })
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}