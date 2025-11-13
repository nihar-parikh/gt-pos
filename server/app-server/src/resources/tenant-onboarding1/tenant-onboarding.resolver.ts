import { Resolver } from '@nestjs/graphql';
import { TenantOnboardingService } from './tenant-onboarding.service';

@Resolver()
export class TenantOnboardingResolver {
  constructor(private readonly service: TenantOnboardingService) {}

  // @Mutation(() => TenantOnboardingResult)
  // async registerTenant(
  //   @Args('tenantCode') tenantCode: string,
  //   @Args('adminUser') adminUser: { email: string; name: string }
  //   // Add other args as needed
  // ): Promise<TenantOnboardingResult> {
  //   const tenant = await this.service.createPendingTenant({
  //     tenantCode,
  //     adminUser,
  //   });
  //   console.log({ tenant });

  //   await this.service.enqueueProvisioningJob(tenant, {
  //     tenantCode,
  //     adminUser,
  //   });
  //   return { tenant_request_id: tenant.id, status: 'PENDING' };
  // }
}

// GraphQL result type
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TenantOnboardingResult {
  @Field()
  tenant_request_id: string;

  @Field()
  status: string;
}
