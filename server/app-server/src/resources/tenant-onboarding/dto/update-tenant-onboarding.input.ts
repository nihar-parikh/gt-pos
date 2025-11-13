import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTenantOnboardingInput } from './create-tenant-onboarding.input';

@InputType()
export class UpdateTenantOnboardingInput extends PartialType(
  CreateTenantOnboardingInput
) {
  @Field(() => Int)
  id: number;
}
