import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity()
export class ServiceCountry {
  @Index()
  @PrimaryColumn('int')
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  symbol: string;

  @Column('text', { nullable: false })
  image: string;

  @OneToMany(() => ServiceState, (state) => state.countryId)
  @JoinColumn({ name: 'id' })
  states: ServiceState[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity()
export class ServiceState {
  @Index()
  @PrimaryColumn('int')
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  image: string;

  @Column('int', { nullable: false })
  countryId: number;

  @ManyToOne(() => ServiceCountry, (country) => country.id)
  @JoinColumn({ name: 'countryId' })
  country: ServiceCountry;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
