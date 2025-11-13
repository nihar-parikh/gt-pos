import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import bull from 'bull';

interface CreateTenantDto {
  tenantCode: string;
  adminUser: {
    email: string;
    name: string;
  };
}

interface TenantInfo {
  id: string;
  code: string;
  status?: string;
  provisioningDetails?: Record<string, unknown>;
}

interface ProvisioningInfo {
  databaseUrl?: string;
  apiKey?: string;
  status: string;
  [key: string]: unknown;
}

@Injectable()
export class TenantOnboardingService {
  constructor(
    @InjectQueue('tenant-provisioning1') private readonly queue: bull.Queue
  ) {}

  async createPendingTenant(dto: CreateTenantDto): Promise<TenantInfo> {
    // Simulate DB insert for pending tenant
    // In production, insert into tenants table with status=PENDING
    const tenantId = 'tenant_' + Date.now();
    console.log(`Creating pending tenant: ${tenantId}`);
    return { id: tenantId, code: dto.tenantCode };
  }

  async enqueueProvisioningJob(
    tenant: TenantInfo,
    dto: CreateTenantDto
  ): Promise<bull.Job> {
    console.log(`Enqueuing provisioning job for tenant: ${tenant.id}`);
    try {
      if (!this.queue) {
        throw new Error('Queue is not initialized.');
      }
      console.log('Queue initialized:', this.queue.name);

      // await this.clearQueue()

      const job = await this.queue.add('provision-tenant', {
        tenantId: tenant.id,
        tenantCode: tenant.code,
        adminUser: dto.adminUser,
        // ...other metadata
      });
      console.log('Provisioning job enqueued:', job.id);
      const counts = await this.queue.getJobCounts();
      console.log({ counts });
      return job;
    } catch (error) {
      console.error('Error enqueuing provisioning job:', error);
      throw error;
    }
  }

  async clearQueue() {
    await this.queue.clean(0, 'completed');
    await this.queue.clean(0, 'failed');
    await this.queue.clean(0, 'wait');
    await this.queue.clean(0, 'delayed');
    await this.queue.clean(0, 'active');
  }

  async activateTenant(
    tenantId: string,
    info: ProvisioningInfo
  ): Promise<TenantInfo> {
    // Simulate DB update for tenant activation
    // In production, update tenants table with status=ACTIVE and store info
    console.log(`Activating tenant: ${tenantId}`);
    console.log('Provisioning info:', info);
    // Optionally emit event or notify frontend
    return {
      id: tenantId,
      code: '', // This would come from the database in production
      status: 'ACTIVE',
      provisioningDetails: info,
    };
  }
}
