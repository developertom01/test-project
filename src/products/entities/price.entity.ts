import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Product } from './product.entity';

@Entity({})
export class Price {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string;

  @Index()
  @Column({
    default: uuidV4(),

    nullable: false,
  })
  public uuid: string;

  @Column({ type: 'float', nullable: false })
  public price: number;

  @Index()
  @Column({ type: 'bigint', nullable: false })
  productId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.prices, {
    lazy: true,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
