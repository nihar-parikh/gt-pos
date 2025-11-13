import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantOnboardingInput } from './dto/create-tenant-onboarding.input';
import { TenantOnboarding } from './entities/tenant-onboarding.entity';

@Injectable()
export class TenantOnboardingService {
  constructor(
    @InjectRepository(TenantOnboarding)
    private readonly tenantRepo: Repository<TenantOnboarding>
  ) {}

  async create(input: CreateTenantOnboardingInput): Promise<TenantOnboarding> {
    const tenant = this.tenantRepo.create(input);
    return this.tenantRepo.save(tenant);
  }

  async findAll(): Promise<TenantOnboarding[]> {
    return this.tenantRepo.find();
  }

  async findOne(id: number): Promise<TenantOnboarding | null> {
    return this.tenantRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    await this.tenantRepo.delete(id);
    return true;
  }
}
