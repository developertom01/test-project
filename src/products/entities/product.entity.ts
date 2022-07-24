import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Price } from './price.entity';
@Entity({})
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string;

  @Index()
  @Column({
    nullable: false,
  })
  public uuid: string;

  @Column({
    nullable: false,
  })
  public name: string;

  @OneToMany((price) => Price, (price) => price.product, {
    lazy: true,
    nullable: true,
  })
  public readonly prices?: Price[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
