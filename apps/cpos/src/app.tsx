import { Outlet, Route, Routes } from 'react-router-dom';
import { ForgotPassword } from './modules/auth/forgot-password';
import { Login } from './modules/auth/login';
import { ResetPassword } from './modules/auth/reset-password';
import { VerifyOtp } from './modules/auth/verify-otp';
import { Inventory } from './modules/inventory';
import TenantOnboarding from './modules/tenant-onboarding/src/tenant-onboarding';
import { ForgotPasswordProvider } from './providers/ForgotPasswordContext';

function ForgotPasswordLayout() {
  return (
    <ForgotPasswordProvider>
      <Outlet />
    </ForgotPasswordProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ForgotPasswordLayout />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/tenant-onboarding" element={<TenantOnboarding />} />
    </Routes>
  );
}

export default App;
