import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Price } from './price.entity';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';

@Entity({ orderBy: { createdAt: { order: 'DESC' } } })
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

  @OneToMany(() => Price, (price) => price.product, {
    lazy: true,
    nullable: true,
  })
  public readonly prices?: Price[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  addUUIdAndUpdateDates() {
    this.uuid = uuidV4();
    this.createdAt = moment.utc().toDate();
    this.updatedAt = moment.utc().toDate();
  }
  @BeforeUpdate()
  updateDate() {
    this.updatedAt = moment.utc().toDate();
  }
}
