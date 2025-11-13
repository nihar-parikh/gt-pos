import { createContext, ReactNode, useContext, useState } from 'react';

export type ForgotPasswordStep =
  | 'sendOtp'
  | 'verifyOtp'
  | 'resetPassword'
  | null;

export interface ForgotPasswordContextType {
  step: ForgotPasswordStep;
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>;
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
  resetToken: string;
  setResetToken: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPasswordContext = createContext<
  ForgotPasswordContextType | undefined
>(undefined);

export const ForgotPasswordProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [step, setStep] = useState<ForgotPasswordStep>(null);
  const [mobile, setMobile] = useState('');
  const [resetToken, setResetToken] = useState('');

  return (
    <ForgotPasswordContext.Provider
      value={{ step, setStep, mobile, setMobile, resetToken, setResetToken }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPasswordContext = (): ForgotPasswordContextType => {
  const context = useContext(ForgotPasswordContext);
  if (context === undefined) {
    throw new Error(
      'useForgotPasswordContext must be used inside a ForgotPasswordProvider'
    );
  }
  return context;
};
