import { Process, Processor } from '@nestjs/bull';
import bull from 'bull';
import { DbAdminService } from './db-admin.service';
import { SecretsManagerService } from './secrets-manager.service';
import { TenantOnboardingService } from './tenant-onboarding.service';

interface TenantProvisioningJobData {
  tenantId: string;
  tenantCode: string;
  adminUser: {
    email: string;
    name: string;
  };
}

@Processor('tenant-provisioning1')
export class TenantProvisioningProcessor {
  constructor(
    private readonly dbAdmin: DbAdminService,
    private readonly secrets: SecretsManagerService,
    private readonly onboarding: TenantOnboardingService
  ) {}

  @Process('provision-tenant')
  async handleProvisionTenant(job: bull.Job<TenantProvisioningJobData>) {
    try {
      const { tenantId, tenantCode, adminUser } = job.data;
      console.log('Job received:', { tenantId, tenantCode, adminUser });

      console.log('Creating tenant DB...');
      const dbInfo = await this.dbAdmin.createTenantDb(tenantCode);
      console.log('DB created:', dbInfo);

      console.log('Storing DB credentials...');
      const secretRef = await this.secrets.storeDbCredentials(dbInfo);
      console.log('DB credentials stored:', secretRef);

      console.log('Running migrations...');
      await this.dbAdmin.runMigrations(dbInfo);
      console.log('Migrations complete.');

      console.log('Seeding admin user...');
      await this.dbAdmin.seedAdminUser(dbInfo, adminUser);
      console.log('Admin user seeded.');

      console.log('Activating tenant...');
      await this.onboarding.activateTenant(tenantId, {
        dbName: dbInfo.dbName,
        secretRefs: { db: secretRef },
        status: 'PROVISIONED',
      });
      console.log('Tenant activated.');
    } catch (error) {
      console.error('Error in handleProvisionTenant:', error);
      throw error;
    }
  }
}
