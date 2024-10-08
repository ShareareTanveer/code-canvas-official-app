import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber, IsOptional, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { EGender } from '../../enum/gender.enum';
import { User } from './user.entity';

@Entity('user_details', { orderBy: { id: 'DESC' } })
export class UserDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 15, nullable: true })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsOptional()
  phone: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  address: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  image: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cloudinary_image_public_id: string;

  @Column({ type: 'enum', enum: EGender, nullable: true })
  @IsNotEmpty()
  @IsEnum(EGender, { message: 'Gender must be Male, Female, or Other' })
  gender: EGender;

  // @Column({ type: 'date', nullable: false })
  // @IsDate()
  // birthDate: Date;

  @OneToOne(() => User, (user) => user.details, {
    onDelete: 'CASCADE',
  })
  user: User;
}
