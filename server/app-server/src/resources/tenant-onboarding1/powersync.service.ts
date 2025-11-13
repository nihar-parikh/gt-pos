import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerSyncService {
  async provisionTenant(tenantCode: string) {
    // TODO: Provision sync engine for tenant
    return {
      url: `https://sync.example.com/${tenantCode}`,
      apiKey: 'sync_api_key_' + tenantCode,
    };
  }
}
