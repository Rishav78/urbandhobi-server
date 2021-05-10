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

  @Column('int', { nullable: true })
  timingId: number;

  @Column('uuid', { nullable: true })
  addressId: string;

  @Column('date', { nullable: true })
  pickupDate: Date;

  @Column('enum', { enum: ['cod'], default: 'cod', nullable: false })
  paymentMethod: string;

  @Column('boolean', { nullable: false, default: true })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
