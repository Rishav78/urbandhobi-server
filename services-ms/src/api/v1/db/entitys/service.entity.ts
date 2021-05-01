import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ServiceType } from './service-type.entity';

@Entity()
export class Services {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  imageId: string;

  @Column('text', { nullable: true })
  data: string;

  @Column('boolean', { nullable: true })
  active: boolean;

  @Column('uuid', { nullable: false })
  categoryId: string;

  @ManyToOne(() => ServiceType, (type) => type.services)
  @JoinColumn({ name: 'categoryId' })
  serviceType: ServiceType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
