import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantOnboarding } from './entities/tenant-onboarding.entity';
import { TenantOnboardingResolver } from './tenant-onboarding.resolver';
import { TenantOnboardingService } from './tenant-onboarding.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantOnboarding])],
  providers: [TenantOnboardingService, TenantOnboardingResolver],
})
export class TenantOnboardingModule {}
