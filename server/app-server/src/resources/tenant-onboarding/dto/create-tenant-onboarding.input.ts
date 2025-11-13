import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTenantOnboardingInput {
  @Field()
  businessName: string;

  @Field()
  businessType: string;

  @Field()
  businessLocation: string;

  @Field()
  website: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  address1: string;

  @Field({ nullable: true })
  address2?: string;

  @Field()
  state: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field()
  fiscalYear: string;

  @Field()
  baseCurrency: string;

  @Field()
  timeZone: string;

  @Field()
  dateFormat: string;

  @Field()
  language: string;

  @Field({ nullable: true })
  module1?: boolean;

  @Field({ nullable: true })
  module2?: boolean;

  @Field({ nullable: true })
  module3?: boolean;

  @Field({ nullable: true })
  module4?: boolean;

  @Field({ nullable: true })
  module5?: boolean;

  @Field({ nullable: true })
  module6?: boolean;

  @Field({ nullable: true })
  module7?: boolean;

  @Field({ nullable: true })
  module8?: boolean;

  @Field({ nullable: true })
  module9?: boolean;
}
