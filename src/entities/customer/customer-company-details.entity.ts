import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { Customer } from './customer.entity';
import { IsPhoneNumber } from 'class-validator';

@Entity()
export class CustomerCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ length: 15, nullable: false })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phone: string;
  
  @Column({ length: 255, nullable: false })
  city: string;

  @Column({ length: 255, nullable: false })
  address: string;

  @Column({ length: 100, nullable: false })
  tradeLicenseNo: string;

  @Column({ length: 100, nullable: false })
  tradeLicenseAttachment: string;

  @Column({ length: 100, nullable: false })
  tinAttachment: string;

  @Column({ length: 100, nullable: false })
  logo: string;

  @Column({ length: 100, nullable: false })
  tradeLicenseAttachmentPublicId: string;

  @Column({ length: 100, nullable: false })
  tinAttachmentPublicId: string;

  @Column({ length: 100, nullable: false })
  logoPublicId: string;

  @Column({ length: 100, nullable: false })
  postCode: string;

  @Column({ length: 100, nullable: false })
  tinNo: string;

  @OneToOne(() => Customer, (customer) => customer.company)
  customer: Customer;
}
