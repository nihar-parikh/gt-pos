import { FastField } from 'formik';
import { ReusableForm } from '../form';
import { InputField } from '../input';
import { SelectField } from '../select';
import { contactSchema } from './../../../../../src/modules/tenant-onboarding/src/validation/tenant-onboarding.schema';

export type ContactInfo = {
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  state: string;
  city: string;
  zip: string;
};

export function ContactInfoStep({
  value,
  onChange,
}: {
  value: ContactInfo;
  onChange: (next: ContactInfo) => void;
}) {
  const states = ['California', 'Texas', 'New York'];
  const cities = ['Los Angeles', 'San Francisco', 'Dallas'];

  const inputClass =
    'w-full rounded-md bg-[rgba(255,255,255,0.5)] border border-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-3';

  return (
    <ReusableForm
      initialValues={value}
      validateRules={contactSchema}
      onSubmit={(values) => onChange(values)}
      className="grid gap-8 md:grid-cols-2"
    >
      <FastField name="phone">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <InputField
                label="Phone"
                type="tel"
                {...field}
                placeholder="+1 555 123 4567"
                labelClass="text-[18px] font-poppins"
                inputClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>

      <FastField name="email">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <InputField
                label="Email"
                type="email"
                {...field}
                placeholder="name@example.com"
                labelClass="text-[18px] font-poppins"
                inputClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>

      <FastField name="address1">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <InputField
                label="Address 1"
                as="textarea"
                rows={2}
                {...field}
                placeholder="123 Main St"
                labelClass="text-[18px] font-poppins"
                inputClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>

      <FastField name="address2">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <InputField
                label="Address 2"
                as="textarea"
                rows={2}
                {...field}
                placeholder="Apartment, Suite, etc."
                labelClass="text-[18px] font-poppins"
                inputClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>

      <FastField name="state">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <SelectField
                label="State"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                options={states}
                labelClass="text-[18px] font-poppins"
                selectClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>

      <FastField name="city">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <SelectField
                label="City"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                options={cities}
                labelClass="text-[18px] font-poppins"
                selectClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>

      <FastField name="zip">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <div>
              <InputField
                label="Zip/Postal Code"
                {...field}
                placeholder="90001"
                labelClass="text-[18px] font-poppins"
                inputClass={inputClass}
              />
              {meta.error && (
                <p className="text-sm text-destructive">{meta.error}</p>
              )}
            </div>
          </>
        )}
      </FastField>
    </ReusableForm>
  );
}
