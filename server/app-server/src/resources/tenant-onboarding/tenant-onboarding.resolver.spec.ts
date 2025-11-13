import { Test, TestingModule } from '@nestjs/testing';
import { TenantOnboardingResolver } from './tenant-onboarding.resolver';
import { TenantOnboardingService } from './tenant-onboarding.service';

describe('TenantOnboardingResolver', () => {
  let resolver: TenantOnboardingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantOnboardingResolver, TenantOnboardingService],
    }).compile();

    resolver = module.get<TenantOnboardingResolver>(TenantOnboardingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
