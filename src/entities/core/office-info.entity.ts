import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OfficeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, nullable: false })
  phone: string;

  @Column({ length: 100, nullable: false })
  officialEmail: string;

  @Column({ length: 100, nullable: false })
  supportEmail: string;

  @Column({ length: 15, nullable: false })
  supportPhone: string;

  @Column({ length: 100, nullable: false })
  ownerName: string;

  @Column({ length: 100, nullable: false })
  brandName: string;

  @Column({ length: 100, nullable: false })
  workingDayAndTime: string;

  @Column({ length: 100, nullable: false })
  closedDay: string;

  @Column({ length: 50, nullable: false })
  bin: string;

  @Column({ length: 15, nullable: false })
  hotline: string;

  @Column({ type: 'text', nullable: false })
  officeAddress: string;

  @Column({ type: 'text', nullable: true })
  secondaryOfficeAddress: string;

  @Column({ length: 255, nullable: true })
  linkedIn?: string;

  @Column({ length: 255, nullable: true })
  facebook?: string;

  @Column({ length: 255, nullable: true })
  twitter?: string;  

  @Column({ length: 255, nullable: true })
  instagram?: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6, nullable: false })
  longitude: number;
}
