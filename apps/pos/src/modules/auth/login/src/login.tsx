import { db } from '@gtpos/core';
import { lists } from '@gtpos/core/powersync/core/app-schema';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react';
import { FastField } from 'formik';
import { memo } from 'react';
import {
  Button,
  InputField,
  ReusableForm,
} from './../../../../../src/shared/components/ui';
import { useLogin } from './use-login';
import { loginSchema } from './validation/login.schema';

/* 
INFO: FastField only use when:
  If a <Field /> is "independent" of all other <Field />'s in your form, then you can use <FastField />
  Use <field /> when there is dependencies like city field populates data based state field selection. 
*/
const LoginFormFields = memo(() => {
  return (
    <>
      {/* Username Field */}
      <div className="mb-4 sm:mb-6">
        <FastField name="username">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <InputField
                label="Email"
                {...field}
                placeholder="username@gmail.com"
                labelClass="text-white text-base sm:text-sm md:text-sm"
                inputClass="p-1 sm:p-2 md:p-2 text-dark-700 border-gray-300 focus:ring-blue-600 w-full rounded-md !bg-white text-black"
              />
              {meta.error && (
                <div
                  className="text-red-400 text-xs sm:text-sm mt-1"
                  data-testid="login-username-error"
                >
                  {meta.error}
                </div>
              )}
            </>
          )}
        </FastField>
      </div>

      {/* Password Field */}
      <div className="mb-4 sm:mb-6">
        <FastField name="password">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <InputField
                label="Password"
                type="password"
                {...field}
                placeholder="••••••••"
                labelClass="text-white text-base sm:text-sm md:text-sm"
                inputClass="p-1 sm:p-2 md:p-2 text-dark-700 border-gray-300 focus:ring-blue-600 w-full rounded-md bg-white text-black"
              />
              {meta.error && (
                <div
                  className="text-red-400 text-xs sm:text-sm mt-1"
                  data-testid="login-password-error"
                >
                  {meta.error}
                </div>
              )}
              <div className="text-left mt-2">
                <a
                  href="#"
                  className="text-xs sm:text-sm text-white hover:text-gray-200 underline"
                >
                  Forgot Password?
                </a>
              </div>
            </>
          )}
        </FastField>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        title="Sign In"
        className="w-full bg-[#003465] text-base font-medium sm:text-lg md:text-lg hover:bg-blue-700 text-white py-2 sm:py-3 rounded-md tracking-[2px] transition-all duration-200"
      />
    </>
  );
});

export const Login = () => {
  const { handleSubmit } = useLogin();

  //START: Create list query for dev server testing, remove this once done
  const query = db.select().from(lists);
  const { data: listRecords } = useQuery(toCompilableQuery(query));

  console.log('Fetched list record:', listRecords);
  //END: Create list query for dev server testing

  return (
    <div className="relative bg-[url('/pos-login.png')] min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* 💎 Glassmorphism Login Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/1 border border-white/20 py-8 sm:py-10 px-6 sm:px-10 md:px-24 rounded-3xl shadow-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[45%] xl:w-[30%] text-white">
        <h2 className="text-xl sm:text-3xl md:text-3xl font-semibold mb-4 sm:mb-6 text-left">
          Login
        </h2>

        <ReusableForm
          className="flex flex-col gap-4 sm:gap-6"
          initialValues={loginSchema.parse({})}
          validateRules={loginSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <LoginFormFields />
        </ReusableForm>
      </div>
    </div>
  );
};
