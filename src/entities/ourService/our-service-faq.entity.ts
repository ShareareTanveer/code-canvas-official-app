import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { IsNotEmpty, IsString } from 'class-validator';
  import { OurService } from './our-service.entity';
  
  @Entity()
  export class OurServiceFAQ {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255 })
    @IsString()
    @IsNotEmpty()
    question: string;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    answer: string;
  
    @ManyToOne(() => OurService, (service) => service.faqs, {
      onDelete: 'CASCADE',
    })
    service: OurService;
  }
  