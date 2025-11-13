import { graphQLClient } from '@gtpos/core/graphql-request/graphql-client';
import {
  CREATE_TENANT,
  CreateTenantResponse,
  CreateTenantVariables,
} from './graphql/mutations/tenant-onboarding-mutation';

export interface TenantForm {
  business: {
    name: string;
    type: string;
    location: string;
    website?: string | null;
    logoUrl?: string | null;
  };
  contact: {
    phone: string;
    email: string;
    address1: string;
    address2?: string | null;
    state: string;
    city: string;
    zip: string;
  };
  other: {
    fiscalYear: string;
    baseCurrency: string;
    timeZone: string;
    dateFormat: string;
    language: string;
  };
  modules: {
    inventory: boolean;
    billing: boolean;
  };
}

export const tenantOnboardingService = {
  async createTenant(form: TenantForm) {
    try {
      const variables: CreateTenantVariables = {
        businessName: form.business.name,
        businessType: form.business.type,
        businessLocation: form.business.location,
        website: form.business.website ?? '',
        phone: form.contact.phone,
        email: form.contact.email,
        address1: form.contact.address1,
        address2: form.contact.address2 || '',
        state: form.contact.state,
        city: form.contact.city,
        zip: form.contact.zip,
        fiscalYear: form.other.fiscalYear,
        baseCurrency: form.other.baseCurrency,
        timeZone: form.other.timeZone,
        dateFormat: form.other.dateFormat,
        language: form.other.language,
        module1: form.modules.inventory,
        module2: form.modules.billing,
        logoUrl: form.business.logoUrl || '',
      };

      const data = await graphQLClient.request<CreateTenantResponse>(
        CREATE_TENANT,
        variables
      );
      console.log('✅ Tenant created:', data.createTenant);
      return data.createTenant;
    } catch (err: unknown) {
      console.error('❌ GraphQL Tenant creation Error:', err);
      // Safely extract GraphQL error message if present
      let message = 'Tenant creation failed';
      if (err instanceof Error) {
        message = err.message || message;
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const resp = (
          err as {
            response?: { errors?: { message?: string }[] };
          }
        ).response;
        message = resp?.errors?.[0]?.message || message;
      }
      throw new Error(message);
    }
  },
};
