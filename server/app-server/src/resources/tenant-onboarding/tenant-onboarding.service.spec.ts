import { Test, TestingModule } from '@nestjs/testing';
import { TenantOnboardingService } from './tenant-onboarding.service';

describe('TenantOnboardingService', () => {
  let service: TenantOnboardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantOnboardingService],
    }).compile();

    service = module.get<TenantOnboardingService>(TenantOnboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
