import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { nullable: true })
  title: string;

  @Column('text', { nullable: false })
  userId: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  houseno: string;

  @Column('text', { nullable: false })
  city: string;

  @Column('text', { nullable: false })
  postalCode: string;

  @Column('text', { nullable: false })
  state: string;

  @Column('text', { nullable: false })
  stateCode: string;

  @Column('text', { nullable: false })
  country: string;

  @Column('text', { nullable: false })
  countryCode: string;

  @Column('text', { nullable: false })
  locality: string;

  @Column('text', { nullable: true })
  district: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
