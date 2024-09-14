import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  AfterInsert,
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EDiscountType } from '../../enum/discountType.enum';
import { DecimalColumnTransformer } from '../../utilities/decimal-column-transformer.utility';
import { Product } from './product.entity';

@Entity()
export class PriceOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;

  @Column({ nullable: true })
  support_for: string;

  @Column({ nullable: true })
  pricePer: string;

  @Column({ nullable: true })
  serviceLink?: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new DecimalColumnTransformer(),
  })
  totalPrice: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new DecimalColumnTransformer(),
  })
  discount: number;

  @Column({
    type: 'enum',
    enum: EDiscountType,
    nullable: true,
    default: EDiscountType.AMOUNT,
  })
  @IsNotEmpty()
  @IsEnum(EDiscountType, {
    message: 'Discount type must be Percent or Amount',
  })
  discountType: EDiscountType;

  @ManyToOne(() => Product, (product) => product.priceOptions, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsString({ each: true })
  keyPoints?: string[];

  @AfterInsert()
  @BeforeInsert()
  calculateTotalPrice() {
    let unitPrice = this.price;
    if (this.discountType === EDiscountType.PERCENT) {
      unitPrice -= (unitPrice * this.discount) / 100;
    } else if (this.discountType === EDiscountType.AMOUNT) {
      unitPrice -= this.discount;
    } else {
      throw new Error('Invalid discount type');
    }
    this.totalPrice = unitPrice;
  }

  @AfterLoad()
  recalculateTotalPrice() {
    this.calculateTotalPrice();
  }
}
