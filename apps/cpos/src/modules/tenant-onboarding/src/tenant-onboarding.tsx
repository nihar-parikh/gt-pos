import { MultiStepForm } from './../../../../src/shared/components/ui';
import { useTenantOnboarding } from './use-tenant-onboarding';

export const TenantOnboarding = () => {
  const { submitTenant, loading } = useTenantOnboarding();

  const handleSubmit = async (formData: Parameters<typeof submitTenant>[0]) => {
    try {
      await submitTenant(formData);
      // optionally navigate to another page after success
      // navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="min-h-dvh w-full">
      <section
        aria-label="Onboarding Background"
        className="relative min-h-screen h-[100vh] flex items-center justify-center w-full px-5 sm:px-0 
                 bg-[url('/background-login.png')] bg-[#052B54] bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/royal-bg.png')" }}
          role="img"
          aria-label="Background image of a grocery aisle"
        />
        <div className="absolute inset-0 bg-background/60" />

        <div className="relative mx-auto w-[100%] p-12 md:py-12">
          <MultiStepForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </section>
    </main>
  );
};
export default TenantOnboarding;
