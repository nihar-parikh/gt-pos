import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DbAdminService } from './db-admin.service';
import { PowerSyncService } from './powersync.service';
import { SecretsManagerService } from './secrets-manager.service';
import { TenantOnboardingResolver } from './tenant-onboarding.resolver';
import { TenantOnboardingService } from './tenant-onboarding.service';
import { TenantProvisioningProcessor } from './tenant-provisioning.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tenant-provisioning1',
      redis: {
        host: 'localhost', // or your Redis host
        port: 6379, // or your Redis port
        maxRetriesPerRequest: 1,
      },
    }),
  ],
  providers: [
    TenantOnboardingService,
    TenantProvisioningProcessor,
    DbAdminService,
    SecretsManagerService,
    PowerSyncService,
    TenantOnboardingResolver,
  ],
})
export class TenantOnboardingModule1 {}
