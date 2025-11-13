import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  username: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;
}
