import eventBus from '@gtpos/core/event-bus';
import { useNavigate } from 'react-router-dom';
import { LoginService } from './login.service';
import { useLoginStore } from './zustand-store/use-login.store';

export const useLogin = () => {
  const navigate = useNavigate();
  const loginStore = useLoginStore((s) => s.login);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const userData = await LoginService?.login({
        username: values.username,
        password: values.password,
        isAdmin: false,
      });

      loginStore(userData.accessToken, userData.username);
      localStorage.setItem('token', userData.accessToken);
      navigate('/inventory');

      eventBus.emit('toast', `Welcome ${userData.username}!`);
    } catch (error: unknown) {
      console.error('❌ Login failed:', error);
      const message =
        error instanceof Error
          ? error.message
          : String(error || 'Login failed');
      eventBus.emit('toast', message);
    }
  };

  const handleNavigateTenant = () => {
    navigate('/tenant-onboarding');
  };

  return { handleSubmit, handleNavigateTenant };
};
