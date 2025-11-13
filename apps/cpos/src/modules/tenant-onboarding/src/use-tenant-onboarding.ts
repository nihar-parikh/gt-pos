// hooks/use-tenantOnboarding.ts
import { useState } from 'react';
import {
  TenantForm,
  tenantOnboardingService,
} from './tenant-onboarding.service';

export const useTenantOnboarding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitTenant = async (form: TenantForm) => {
    setLoading(true);
    setError(null);
    try {
      const tenant = await tenantOnboardingService.createTenant(form);
      setSuccess(true);
      return tenant;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitTenant, loading, error, success };
};
