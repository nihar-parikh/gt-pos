import { Field } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  ReusableForm,
  Toast,
} from '../../../../../src/shared/components/ui';
import { useForgotPasswordContext } from '../../../../providers/ForgotPasswordContext';
import { useResetPassword } from './use-reset-password';
import { resetPasswordSchema } from './validation/reset-password.schema';

const ForgotPasswordFormFields = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="mb-6 relative">
        <Field name="password">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <label className="block text-white text-lg sm:text-xl mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="w-full p-3 sm:p-4 text-dark-700 bg-white border border-gray-300 rounded-md focus:ring-blue-600 focus:outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {meta.error && (
                <div className="text-red-600 mt-1">{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </div>

      {/* Confirm Password Field */}
      <div className="mb-6 relative">
        <Field name="confirm_password">
          {({ field, meta }: import('formik').FieldProps) => (
            <>
              <label className="block text-white text-lg sm:text-xl mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...field}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  className="w-full p-3 sm:p-4 text-dark-700 bg-white border border-gray-300 rounded-md focus:ring-blue-600 focus:outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {meta.error && (
                <div className="text-red-600 mt-1">{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </div>

      <Button
        type="submit"
        title="Reset Password →"
        className="w-full bg-[#007BFF] text-lg sm:text-21 hover:bg-blue-700 text-white p-3 rounded-md tracking-[3px]"
      />
    </>
  );
};

export const ResetPassword = () => {
  const { handleSubmit } = useResetPassword();
  const navigate = useNavigate();
  const { step, resetToken } = useForgotPasswordContext();
  const location = useLocation();
  const phone = location.state?.phone;

  useEffect(() => {
    const token = sessionStorage.getItem('reset_token');
    if (step !== 'resetPassword' || !token) navigate('/forgot-password');
  }, []);

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
            Set new password
          </h2>

          <ReusableForm
            className="flex flex-col gap-6"
            initialValues={resetPasswordSchema.parse({})}
            validateRules={resetPasswordSchema}
            onSubmit={(values) => {
              values.phone = phone;
              values.resetToken = resetToken;
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
