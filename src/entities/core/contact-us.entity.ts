import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsPhoneNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class ContactUs extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  @IsEmail()
  email: string;

  @Column({ length: 15, nullable: true })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  phone: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  subject?: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  message: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  fullName?: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  company?: string;
}
