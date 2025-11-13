import { FastField } from 'formik';
import { ReusableForm } from '../form';
import { InputField } from '../input';
import { SelectField } from '../select';
import { otherInfoSchema } from './../../../../../src/modules/tenant-onboarding/src/validation/tenant-onboarding.schema';

export type OtherInfo = {
  fiscalYear: string;
  baseCurrency: string;
  timeZone: string;
  dateFormat: string;
  language: string;
};

export function OtherInfoStep({
  value,
  onChange,
}: {
  value: OtherInfo;
  onChange: (next: OtherInfo) => void;
}) {
  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY'];
  const timeZones = [
    'UTC−08:00 Pacific Time (US & Canada)',
    'UTC−05:00 Eastern Time (US & Canada)',
    'UTC+00:00 London',
    'UTC+05:30 India Standard Time',
    'UTC+08:00 Singapore',
  ];
  const dateFormats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
  const languages = ['English', 'French', 'Spanish', 'German', 'Hindi'];

  const inputClass =
    'w-full rounded-md bg-[rgba(255,255,255,0.5)] border border-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-3';

  return (
    <ReusableForm
      initialValues={value}
      validateRules={otherInfoSchema}
      onSubmit={(values) => onChange(values)}
      className="grid gap-8 md:grid-cols-2"
    >
      <FastField name="fiscalYear">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <InputField
              label="Fiscal Year"
              {...field}
              placeholder="2025-2026"
              labelClass="text-[18px] font-poppins"
              inputClass={inputClass}
            />
            {meta.error && (
              <p className="text-sm text-destructive">{meta.error}</p>
            )}
          </>
        )}
      </FastField>

      <FastField name="baseCurrency">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <SelectField
              label="Base Currency"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              labelClass="text-[18px] font-poppins"
              options={currencies}
              selectClass={inputClass}
            />
            {meta.error && (
              <p className="text-sm text-destructive">{meta.error}</p>
            )}
          </>
        )}
      </FastField>

      <FastField name="timeZone">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <SelectField
              label="Time Zone"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={timeZones}
              labelClass="text-[18px] font-poppins"
              selectClass={inputClass}
            />
            {meta.error && (
              <p className="text-sm text-destructive">{meta.error}</p>
            )}
          </>
        )}
      </FastField>

      <FastField name="dateFormat">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <SelectField
              label="Date Format"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={dateFormats}
              labelClass="text-[18px] font-poppins"
              selectClass={inputClass}
            />
            {meta.error && (
              <p className="text-sm text-destructive">{meta.error}</p>
            )}
          </>
        )}
      </FastField>

      <FastField name="language">
        {({ field, meta }: import('formik').FieldProps) => (
          <>
            <SelectField
              label="Language"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={languages}
              labelClass="text-[18px] font-poppins"
              selectClass={inputClass}
            />
            {meta.error && (
              <p className="text-sm text-destructive">{meta.error}</p>
            )}
          </>
        )}
      </FastField>
    </ReusableForm>
  );
}
