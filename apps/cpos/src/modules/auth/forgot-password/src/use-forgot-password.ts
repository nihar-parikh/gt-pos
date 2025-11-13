import eventBus from '@gtpos/core/event-bus';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordContext } from '../../../../providers/ForgotPasswordContext';
import { ForgotPasswordService } from './forgot-password.service';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { setStep, setMobile } = useForgotPasswordContext();

  const handleSubmit = async (values: { mobile: string }) => {
    try {
      const mobile = values.mobile;

      const { expiresTime, otp } = await ForgotPasswordService.sendOtp(mobile);

      // setMobile(mobile);
      setStep('verifyOtp');

      navigate('/verify-otp', {
        state: { mobile: values.mobile, expiresTime, otp },
      });

      eventBus.emit('toast', 'OTP Sent Successfully');
    } catch (error: unknown) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : undefined;
      eventBus.emit('toast', errorMessage || 'Failed to send OTP');
    }
  };
  return { handleSubmit };
};
