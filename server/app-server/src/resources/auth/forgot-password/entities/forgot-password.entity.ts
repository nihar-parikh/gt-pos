import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('user_otps')
export class ForgotPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  phone: string;

  @Column()
  otp_hash: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  reset_token?: string;

  @CreateDateColumn()
  created_at: Date;
}
