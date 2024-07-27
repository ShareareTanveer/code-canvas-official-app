import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";
import { DecimalColumnTransformer } from "../../utilities/decimal-column-transformer.utility";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, {onDelete: "CASCADE"})
  order: Order;

  @ManyToOne(() => Product, {eager: true})
  product: Product;

  @Column('decimal', { precision: 10, scale: 2, transformer: new DecimalColumnTransformer() })
  price: number;
}
