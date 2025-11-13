import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class TenantOnboarding {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  businessName: string;

  @Field()
  @Column()
  businessType: string;

  @Field()
  @Column()
  businessLocation: string;

  @Field()
  @Column()
  website: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logoUrl?: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  address1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address2?: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  zipCode?: string;

  @Field()
  @Column()
  fiscalYear: string;

  @Field()
  @Column()
  baseCurrency: string;

  @Field()
  @Column()
  timeZone: string;

  @Field()
  @Column()
  dateFormat: string;

  @Field()
  @Column()
  language: string;

  // 9 modules toggles (boolean)
  @Field({ defaultValue: false })
  @Column({ default: false })
  module1: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module2: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module3: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module4: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module5: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module6: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module7: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module8: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  module9: boolean;
}
