import { FastField } from 'formik';
import { memo } from 'react';
import {
  Button,
  InputField,
  ReusableForm,
  Toast,
} from '../../../../../src/shared/components/ui';
import { useForgotPassword } from './use-forgot-password';
import { forgotPasswordSchema } from './validation/forgot-password.schema';

const ForgotPasswordFormFields = memo(() => {
  return (
    <>
      <div className="mb-6">
        <FastField name="mobile">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <InputField
                label="Mobile Number:"
                {...field}
                placeholder="9876543210"
                labelClass="text-white text-lg sm:text-xl"
                inputClass="p-3 sm:p-4 text-dark-700 bg-white border-gray-300 focus:ring-blue-600"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  field.onChange(e.target.name)(value);
                }}
              />
              {meta.error && (
                <div
                  className="text-red-600"
                  data-testid="login-username-error"
                >
                  {meta.error}
                </div>
              )}
            </>
          )}
        </FastField>
      </div>

      <Button
        type="submit"
        title="Send OTP →"
        className="w-full bg-[#007BFF] text-lg sm:text-21 hover:bg-blue-700 text-white p-3 rounded-md tracking-[3px]"
      />
    </>
  );
});

export const ForgotPassword = () => {
  const { handleSubmit } = useForgotPassword();

  return (
    <div
      className="relative min-h-screen h-[100vh] flex items-center justify-center w-full px-5 sm:px-0 
                     bg-[url('/background-login.png')] bg-[#052B54] bg-cover bg-center"
    >
      <div
        className="flex flex-col lg:flex-row bg-[#DDDDDD4D] shadow-lg overflow-hidden w-full 
                 max-w-[90%] sm:max-w-[500px] lg:max-w-6xl 
                 rounded-[30px] border-white border-2"
      >
        <div
          className="hidden lg:flex lg:w-5/12 flex-col justify-between p-8 text-white 
                         drop-shadow-[6px_0_12px_rgba(0,0,0,0.3)] bg-[rgba(27,137,255,0.69)] 
                         rounded-[30px] border-r-0 lg:border-r-2 border-white"
        >
          <div className="text-center mt-8 font-inter">
            <div className="text-3xl sm:text-4xl font-light">Welcome to</div>
            <div className="text-4xl sm:text-6xl font-bold text-white">
              GT POS
            </div>
            <div className="mt-2 font-light text-xl sm:text-2xl">
              We made it for you
            </div>
          </div>

          <div className="flex justify-center my-6">
            <img
              src="./ethics-logo-login.png"
              alt="ETHICS"
              className="h-32 w-32 sm:h-40 sm:w-40 object-contain rounded-full"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="./food-consumption.png"
              alt="POS Illustration"
              className="h-32 sm:h-38 object-contain"
            />
          </div>
        </div>

        <div className="w-full lg:w-8/12 flex flex-col justify-around bg-transparent py-10 sm:py-16 md:py-24 px-6 sm:px-16 md:px-28">
          <h2 className="text-4xl sm:text-5xl font-black text-white font-poppins mb-8">
            Forgot Password?
          </h2>

          <ReusableForm
            className="flex flex-col gap-6"
            initialValues={forgotPasswordSchema.parse({})}
            validateRules={forgotPasswordSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <ForgotPasswordFormFields />
          </ReusableForm>
        </div>

        <Toast />
      </div>
    </div>
  );
};
