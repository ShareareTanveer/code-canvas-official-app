import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OrderItem } from './order-item.entity';
import { EOrderStaus } from '../../enum/order-status.enum';
import { IsEnum, IsString } from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { DecimalColumnTransformer } from '../../utilities/decimal-column-transformer.utility';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, { onDelete: "CASCADE" })
  items: OrderItem[];

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new DecimalColumnTransformer(),
  })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: EOrderStaus,
    nullable: true,
    default: EOrderStaus.Pending,
  })
  @IsEnum(EOrderStaus)
  orderStatus: EOrderStaus;

  @Column({nullable: true})
  @IsString()
  paymentID?: string;

  @Column({nullable: true})
  @IsString()
  paymentNumber?: string;

  @Column({nullable: true})
  @IsString()
  merchantInvoiceNumber?: string;  
  
  @Column({nullable: true})
  @IsString()
  trxID?: string;

  @Column({nullable: true})
  @IsString()
  paymentExecuteTime?: string;

  @Column({nullable: true})
  @IsString()
  paymentPortal?: string;
}
