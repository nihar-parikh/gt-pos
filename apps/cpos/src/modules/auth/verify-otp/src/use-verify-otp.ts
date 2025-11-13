import eventBus from '@gtpos/core/event-bus';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordContext } from '../../../../providers/ForgotPasswordContext';
import { VerifyOtpService } from './verify-otp.service';

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const { setStep, setResetToken } = useForgotPasswordContext();

  const handleSubmit = async (values: { phone: string; otp: string }) => {
    try {
      const { token } = await VerifyOtpService.verifyOtp(
        values.phone,
        values.otp
      );
      sessionStorage.setItem('reset_token', token);
      setResetToken(token);
      eventBus.emit('toast', 'OTP Verified Successfully');
      setStep('resetPassword');
      navigate('/reset-password', { state: { phone: values.phone } });
    } catch (error: unknown) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : undefined;
      eventBus.emit('toast', errorMessage || 'Failed to verify OTP');
    }
  };

  return { handleSubmit };
};
