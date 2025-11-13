import { FastField } from 'formik';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  InputField,
  ReusableForm,
  Toast,
} from '../../../../../src/shared/components/ui';
import { useLogin } from './use-login';
import { loginSchema } from './validation/login.schema';

// const LoginFormFields = memo(() => {
//   const { values, errors, handleChange } = useFormikContext<{
//     username: string;
//     password: string;
//   }>();
//   console.log('login form field');
//   return (
//     <>
//       <div className="mb-6">
//         <InputField
//           label="Your Name"
//           name="username"
//           value={values.username}
//           onChange={handleChange}
//           placeholder="Username here"
//           labelClass="text-white text-lg sm:text-xl"
//           inputClass="p-3 sm:p-4 text-dark-700 bg-white border-gray-300 focus:ring-blue-600"
//         />
//         {errors.username && (
//           <div className="text-red-400 text-sm">{errors.username}</div>
//         )}
//       </div>

//       <div className="mb-6">
//         <InputField
//           label="Password"
//           name="password"
//           type="password"
//           value={values.password}
//           onChange={handleChange}
//           placeholder="••••••••"
//           labelClass="text-white text-lg sm:text-xl"
//           inputClass="p-3 sm:p-4 text-dark-700 bg-white border-gray-300 focus:ring-blue-600"
//         />
//         {errors.password && (
//           <div className="text-red-400 text-sm">{errors.password}</div>
//         )}
//         <div className="text-right mt-2">
//           <a href="#" className="text-sm text-white hover:text-gray-800">
//             Forgot Password?
//           </a>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         title="Lets Go →"
//         className="w-full bg-[#007BFF] text-lg sm:text-21 hover:bg-blue-700 text-white p-3 rounded-md tracking-[3px]"
//       />
//     </>
//   );
// });

/* 
INFO: FastField only use when:
  If a <Field /> is "independent" of all other <Field />'s in your form, then you can use <FastField />
  Use <field /> when there is dependencies like city field populates data based state field selection. 
*/
const LoginFormFields = memo(
  ({ handleNavigateTenant }: { handleNavigateTenant: () => void }) => {
    return (
      <>
        <div className="mb-6">
          <FastField name="username">
            {({ field, meta }: import('formik').FieldProps) => (
              <>
                <InputField
                  label="Your Name"
                  {...field}
                  placeholder="Username here"
                  labelClass="text-white text-lg sm:text-xl"
                  inputClass="p-3 sm:p-4 text-dark-700 bg-white border-gray-300 focus:ring-blue-600"
                />
                {meta.error && (
                  <div
                    className="text-red-400 text-sm"
                    data-testid="login-username-error"
                  >
                    {meta.error}
                  </div>
                )}
              </>
            )}
          </FastField>
        </div>

        <div className="mb-6">
          <FastField name="password">
            {({ field, meta }: import('formik').FieldProps) => (
              <>
                <InputField
                  label="Password"
                  type="password"
                  {...field}
                  placeholder="••••••••"
                  labelClass="text-white text-lg sm:text-xl"
                  inputClass="p-3 sm:p-4 text-dark-700 bg-white border-gray-300 focus:ring-blue-600"
                />
                {meta.error && (
                  <div
                    className="text-red-400 text-sm"
                    data-testid="login-password-error"
                  >
                    {meta.error}
                  </div>
                )}
                <div className="flex justify-between text-right mt-2">
                  {/* <a
                    href="#"
                    className="text-sm text-white hover:text-gray-800 cursor-pointer"
                  >
                    Forgot Password?
                  </a> */}
                  <Link
                    to="/forgot-password"
                    className="text-sm text-white hover:text-gray-800"
                  >
                    Forgot Password?
                  </Link>
                  <a
                    onClick={handleNavigateTenant}
                    className="text-sm text-white hover:text-gray-800 cursor-pointer"
                  >
                    Do not have an account? Sign Up
                  </a>
                </div>
              </>
            )}
          </FastField>
        </div>

        <Button
          type="submit"
          title="Lets Go →"
          className="w-full bg-[#007BFF] text-lg sm:text-21 hover:bg-blue-700 text-white p-3 rounded-md tracking-[3px]"
        />
      </>
    );
  }
);

export const Login = () => {
  const { handleSubmit, handleNavigateTenant } = useLogin();
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
            Login
          </h2>

          <ReusableForm
            className="flex flex-col gap-6"
            initialValues={loginSchema.parse({})}
            validateRules={loginSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <LoginFormFields handleNavigateTenant={handleNavigateTenant} />
          </ReusableForm>
        </div>

        <Toast />
      </div>
    </div>
  );
};
