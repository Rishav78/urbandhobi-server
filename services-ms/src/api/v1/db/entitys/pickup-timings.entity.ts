import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';

@Entity()
export class PickupTiming {
  @Index()
  @PrimaryColumn('int')
  id: number;

  @Column('text', { nullable: false })
  start: string;

  @Column('text', { nullable: false })
  end: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
