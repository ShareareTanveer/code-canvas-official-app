import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';
import { CustomerCompany } from './customer-company-details.entity';
import { CustomerContactPerson } from './customer-contact-person.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => CustomerCompany, (company) => company.customer, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  company: CustomerCompany;

  @OneToOne(
    () => CustomerContactPerson,
    (contactPerson) => contactPerson.customer,
    {
      eager: true,
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  @JoinColumn()
  contactPerson: CustomerContactPerson;

  @Column({ nullable: false })
  nidNumber: string;

  @Column({ nullable: false })
  passportAttachment: string;

  @Column({ nullable: false })
  passportAttachmentPublicId: string;

  @Column({ nullable: true })
  otherAttachment?: string;

  @Column({ nullable: true })
  otherAttachmentPublicId?: string;
}
