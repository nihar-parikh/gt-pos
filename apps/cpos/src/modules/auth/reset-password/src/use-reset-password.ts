import eventBus from '@gtpos/core/event-bus';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordService } from './reset-password.service';

export const useResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    password: string;
    resetToken: string;
    phone: string;
  }) => {
    try {
      await ResetPasswordService.resetPassword(
        values.phone,
        values.resetToken,
        values.password
      );
      sessionStorage.removeItem('reset_token');
      eventBus.emit('toast', 'Password Reset Successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: unknown) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : undefined;
      eventBus.emit('toast', errorMessage || 'Failed to reset password');
    }
  };
  return { handleSubmit };
};
