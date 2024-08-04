import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { EGender } from '../../enum/gender.enum';

@Entity()
export class CustomerContactPerson  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: EGender, nullable: true })
  @IsNotEmpty()
  @IsEnum(EGender, { message: 'Gender must be Male, Female, or Other' })
  gender: EGender;

  @Column()
  phone: string;

  @Column()
  designation: string;

  @OneToOne(() => Customer, (customer) => customer.contactPerson, {
    onDelete: 'CASCADE',
  })
  customer: Customer;
}
