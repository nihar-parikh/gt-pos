import { FastField } from 'formik';
import * as React from 'react';
import { ReusableForm } from '../form';
import { InputField } from '../input';
import { businessSchema } from './../../../../../src/modules/tenant-onboarding/src/validation/tenant-onboarding.schema';
export type BusinessInfo = {
  name: string;
  type: string;
  location: string;
  website: string;
  logoFile?: File | null;
};
export function BusinessInfoStep({
  value,
  onChange,
}: {
  value: BusinessInfo;
  onChange: (next: BusinessInfo) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <ReusableForm
      initialValues={value}
      validateRules={businessSchema}
      onSubmit={(values) => onChange(values)}
      className="grid gap-8 md:grid-cols-2"
    >
      <div className="space-y-8">
        <FastField name="name">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <div>
                <InputField
                  label="Business Name"
                  {...field}
                  placeholder="Lorem dummy merol"
                  labelClass="text-[18px] font-poppins"
                  inputClass="w-full rounded-md bg-[rgba(255,255,255,0.5)] border border-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-3"
                />
                {meta.error && (
                  <p className="text-sm text-red-400 mt-2">{meta.error}</p>
                )}
              </div>
            </>
          )}
        </FastField>

        <FastField name="type">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <div>
                <label className="text-[18px] font-poppins">
                  Business Type
                </label>
                <select
                  {...field}
                  className="w-full rounded-md bg-[rgba(255,255,255,0.5)] border border-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-3"
                >
                  <option value="" disabled>
                    Lorem ipsum dummy text
                  </option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="services">Services</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
                {meta.error && (
                  <p className="text-sm text-red-400 mt-2">{meta.error}</p>
                )}
              </div>
            </>
          )}
        </FastField>

        <FastField name="location">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <div>
                <label className="text-[18px] font-poppins">
                  Business Location
                </label>
                <select
                  {...field}
                  className="w-full rounded-md bg-[rgba(255,255,255,0.5)] border border-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-3"
                >
                  <option value="" disabled>
                    Lorem ipsum dummy text
                  </option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="eu">European Union</option>
                  <option value="in">India</option>
                  <option value="other">Other</option>
                </select>
                {meta.error && (
                  <p className="text-sm text-red-400 mt-2">{meta.error}</p>
                )}
              </div>
            </>
          )}
        </FastField>

        <FastField name="website">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <div>
                <InputField
                  label="Website"
                  type="url"
                  {...field}
                  placeholder="www.ethicsainfotech.in"
                  labelClass="text-[18px] font-poppins"
                  inputClass="w-full rounded-md bg-[rgba(255,255,255,0.5)] border border-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-3"
                />
                {meta.error && (
                  <p className="text-sm text-red-400 mt-2">{meta.error}</p>
                )}
              </div>
            </>
          )}
        </FastField>
      </div>

      <FastField name="logoFile">
        {({ form }: { form: import('formik').FormikProps<BusinessInfo> }) => (
          <div>
            <div className="relative min-h-42 flex rounded-xl flex-col items-center justify-center border border-white bg-card/80 p-4 mt-[36px] bg-[#ffffff]">
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <input
                  ref={fileInputRef}
                  id="logo-file"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    form.setFieldValue('logoFile', file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md cursor-pointer bg-muted/40 px-4 py-8 text-sm text-muted-foreground transition hover:bg-muted text-[18px] font-poppins text-[#00000080]"
                  aria-describedby="logo-hint"
                >
                  Upload Your Logo
                </button>
                {form.values.logoFile && (
                  <p className="text-xs text-muted-foreground">
                    {form.values.logoFile.name}
                  </p>
                )}
              </div>
            </div>
            <p
              id="logo-hint"
              className="mt-4 text-[16px] text-muted-foreground text-center text-[#00000080]"
            >
              This logo will appear on transactions and email notifications.
              <br />
              (Images size: 60x60 px, Maximum size 1MB)
            </p>
          </div>
        )}
      </FastField>
    </ReusableForm>
  );
}
