import { FastField } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  InputField,
  ReusableForm,
  Toast,
} from '../../../../../src/shared/components/ui';
import { useForgotPasswordContext } from '../../../../providers/ForgotPasswordContext';
import { ForgotPasswordService } from '../../forgot-password/src/forgot-password.service';
import OTPTimer from './otp-timer';
import { useVerifyOtp } from './use-verify-otp';
import { verifyOtpSchema } from './validation/verify-otp.schema';

const VerifyOtpFormFields = memo(
  ({
    expiresTime,
    mobile,
    setOtp,
  }: {
    expiresTime: number;
    mobile: string;
    setOtp: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
      []
    );

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      form: import('formik').FormikProps<{ otp: string }>,
      index: number
    ) => {
      const value = e.target.value.replace(/\D/g, '').slice(-1);
      const otpArray = form.values['otp']?.split('') || [];
      otpArray[index] = value;
      const newOtp = otpArray.join('');
      form.setFieldValue('otp', newOtp);

      // move to next input automatically
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number
    ) => {
      if (
        e.key === 'Backspace' &&
        index > 0 &&
        !inputRefs.current[index]?.value
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const timerRef = useRef<{ reset: () => void } | null>(null);

    const handleResendOtp = async () => {
      try {
        console.log('Resending OTP...');
        const { otp } = await ForgotPasswordService.sendOtp(mobile);
        setOtp(otp);
        timerRef.current?.reset();
      } catch (error) {
        console.error('Failed to resend OTP:', error);
      }
    };

    return (
      <>
        <div className="mb-6">
          <FastField name="otp">
            {({ form, meta }: import('formik').FieldProps) => (
              <div className="flex flex-col">
                <div className="flex justify-center gap-3 sm:gap-4 mt-6 mb-4">
                  {[...Array(6)].map((_, index) => (
                    <InputField
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      label=""
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      value={form.values['otp']?.[index] || ''}
                      onChange={(e) => handleChange(e, form, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      inputClass="w-10 h-12 sm:w-14 sm:h-16 text-center text-2xl border border-gray-300 
                                           rounded-md text-dark-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>

                {meta.error && (
                  <div className="text-red-600 mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </FastField>
        </div>

        <Button
          type="submit"
          title="Verify OTP →"
          className="w-full bg-[#007BFF] text-lg sm:text-21 hover:bg-blue-700 text-white p-3 rounded-md tracking-[3px]"
        />
        <OTPTimer
          ref={timerRef}
          initialSeconds={expiresTime}
          onResend={handleResendOtp}
        />
      </>
    );
  }
);

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useVerifyOtp();
  const { step } = useForgotPasswordContext();

  const location = useLocation();
  const mobile = location.state?.mobile;
  const expiresTime = location.state?.expiresTime * 60;
  const [otp, setOtp] = useState(location.state?.otp);

  useEffect(() => {
    if (step !== 'verifyOtp') navigate('/forgot-password');
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
          <h2 className="text-4xl sm:text-5xl font-black text-white font-poppins">
            Enter your code
          </h2>
          <span className="text-white font-poppins text-xl sm:text-1xl font-medium">
            We sent a code to {mobile}
          </span>

          <ReusableForm
            className="flex flex-col gap-6"
            initialValues={verifyOtpSchema.parse({})}
            validateRules={verifyOtpSchema}
            onSubmit={(values) => {
              values.phone = mobile;
              handleSubmit(values);
            }}
          >
            <VerifyOtpFormFields
              expiresTime={expiresTime}
              mobile={mobile}
              setOtp={setOtp}
            />
          </ReusableForm>

          {/* TODO: remove after actual otp send service implemented */}
          <span>Otp: {otp}</span>
        </div>

        <Toast />
      </div>
    </div>
  );
};
