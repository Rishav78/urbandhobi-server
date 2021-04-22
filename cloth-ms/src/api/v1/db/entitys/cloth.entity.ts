import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Cloth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('int', { nullable: true })
  cost: number;

  @Column('boolean', { nullable: true })
  active: boolean;

  @Column('enum', { enum: ['men', 'women'], nullable: false })
  for: 'men' | 'women';

  @Column('boolean', { nullable: false, default: false })
  kids: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
