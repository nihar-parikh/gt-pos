import * as React from 'react';
import { Link } from 'react-router-dom';
import { BusinessInfo, BusinessInfoStep } from './business-info-step';
import { ContactInfo, ContactInfoStep } from './contact-Info-step';
import {
  ModuleManagement,
  ModuleManagementStep,
} from './module-management-step';
import { OtherInfo, OtherInfoStep } from './other-info-step';
import { Stepper } from './stepper';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

type FormState = {
  business: BusinessInfo;
  contact: ContactInfo;
  other: OtherInfo;
  modules: ModuleManagement;
};

const steps = [
  { id: 1, label: 'Business Info' },
  { id: 2, label: 'Contact Info' },
  { id: 3, label: 'Other Info' },
  { id: 4, label: 'Module Management' },
] as const;

interface MultiStepFormProps {
  onSubmit?: (form: FormState) => Promise<void>;
  loading?: boolean;
}

export function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  const [current, setCurrent] = React.useState(0);

  const [form, setForm] = React.useState<FormState>({
    business: { name: '', type: '', location: '', website: '', logoFile: null },
    contact: {
      email: '',
      phone: '',
      address1: '',
      city: '',
      state: '',
      zip: '',
    },
    other: {
      fiscalYear: '',
      baseCurrency: '',
      timeZone: '',
      dateFormat: '',
      language: '',
    },
    modules: {
      inventory: true,
      billing: true,
      crm: false,
      analytics: false,
      hr: false,
      reports: false,
      purchase: false,
      sales: false,
      support: false,
    },
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  console.log('Form errors:', errors);
  function next() {
    const ok = validateCurrent();
    if (!ok) return;
    setCurrent((c) => Math.min(c + 1, steps.length - 1));
  }

  function back() {
    setCurrent((c) => Math.max(c - 1, 0));
  }

  function validateCurrent() {
    const e: Record<string, string> = {};

    if (current === 0) {
      if (!form.business.name.trim())
        e['business.name'] = 'Business name is required.';
      if (!form.business.type) e['business.type'] = 'Select a business type.';
      if (!form.business.location)
        e['business.location'] = 'Select a location.';
      if (!form.business.website.trim())
        e['business.website'] = 'Website is required.';
    }

    if (current === 1) {
      if (!form.contact.email.trim()) e['contact.email'] = 'Email is required.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function setBusiness(next: BusinessInfo) {
    setForm((f) => ({ ...f, business: next }));
  }
  function setContact(next: ContactInfo) {
    setForm((f) => ({ ...f, contact: next }));
  }
  function setOther(next: OtherInfo) {
    setForm((f) => ({ ...f, other: next }));
  }
  function setModules(next: ModuleManagement) {
    setForm((f) => ({ ...f, modules: next }));
  }

  const submit = async () => {
    const ok = validateCurrent();
    if (!ok) return;

    if (onSubmit) {
      await onSubmit(form);
    } else {
      console.log('Form submitted:', form);
    }
  };
  const isLast = current === steps.length - 1;

  return (
    <div
      className={cn(
        'mx-[40px] rounded-3xl bg-card/80 shadow-xl backdrop-blur-8.05px',
        'bg-[rgba(255,255,255,0.8)] md:h-[700px] lg:h-[600px] xl:h-[800px]'
      )}
      aria-label="Business onboarding form"
    >
      <div className="flex flex-col gap-6 h-[100%]">
        <div className="h-18 flex flex-col items-center">
          <Stepper
            steps={steps as unknown as { id: number; label: string }[]}
            currentStep={current}
            onStepClick={(i) => setCurrent(i)}
          />
        </div>

        <div className="rounded-2xl bg-card/60 px-6 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 xl:px-24 xl:py-12 flex-1 overflow-y-auto">
          {current === 0 && (
            <BusinessInfoStep value={form.business} onChange={setBusiness} />
          )}
          {current === 1 && (
            <ContactInfoStep value={form.contact} onChange={setContact} />
          )}
          {current === 2 && (
            <OtherInfoStep value={form.other} onChange={setOther} />
          )}
          {current === 3 && (
            <ModuleManagementStep value={form.modules} onChange={setModules} />
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-18 md:flex-row pb-5">
          {current === 0 ? (
            <>
              <Link
                to="#"
                className="text-[22px] text-muted-foreground text-[#052B54] hover:text-foreground"
                aria-label="Back to login"
              >
                {'<'} Back to Login
              </Link>
            </>
          ) : (
            <>
              <div className="flex w-full justify-end gap-3 md:w-auto">
                <button
                  type="button"
                  onClick={back}
                  disabled={current === 0}
                  className="inline-flex items-center text-[#052B54]  justify-center rounded-md bg-secondary px-4 py-2 text-[22px] transition hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {'<'} Previous
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => (current === steps.length - 1 ? submit() : next())}
            className="inline-flex cursor-pointer items-center justify-center
                            w-[284px] h-[60px] 
                            rounded-[7.83px] 
                            border border-white 
                            bg-[#007BFFB2] 
                            text-white text-[22px] 
                            font-medium 
                            transition hover:opacity-90"
          >
            {isLast ? 'Submit' : 'Next Step'} {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
