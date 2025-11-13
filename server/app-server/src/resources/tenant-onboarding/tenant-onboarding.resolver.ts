import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTenantOnboardingInput } from './dto/create-tenant-onboarding.input';
import { TenantOnboarding } from './entities/tenant-onboarding.entity';
import { TenantOnboardingService } from './tenant-onboarding.service';

@Resolver(() => TenantOnboarding)
export class TenantOnboardingResolver {
  constructor(private readonly tenantService: TenantOnboardingService) {}

  @Query(() => [TenantOnboarding])
  async tenants(): Promise<TenantOnboarding[]> {
    return this.tenantService.findAll();
  }

  @Query(() => TenantOnboarding, { nullable: true })
  async tenant(@Args('id', { type: () => Int }) id: number) {
    return this.tenantService.findOne(id);
  }

  @Mutation(() => TenantOnboarding, { name: 'createTenant' })
  async createTenant(
    @Args('input') input: CreateTenantOnboardingInput
  ): Promise<TenantOnboarding> {
    return this.tenantService.create(input);
  }

  @Mutation(() => Boolean)
  async removeTenant(@Args('id', { type: () => Int }) id: number) {
    return this.tenantService.remove(id);
  }
}
