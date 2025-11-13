import { graphQLClient } from '@gtpos/core';
import {
  VERIFYOTP,
  VerifyOtpResponse,
} from './graphql/mutations/VerifyOtpMutation';

export const VerifyOtpService = {
  async verifyOtp(phone: string, otp: string) {
    const getErrorMessage = (err: unknown): string => {
      if (err && typeof err === 'object') {
        const error = err as {
          response?: { errors?: { message: string }[] };
          message?: string;
        };
        const msg =
          error.response?.errors?.[0]?.message ||
          error.message ||
          'OTP Verification failed';
        return msg;
      }
      return 'OTP Verification failed';
    };

    try {
      const data = await graphQLClient.request<VerifyOtpResponse>(VERIFYOTP, {
        phone,
        otp,
      });
      return data.verifyOtp;
    } catch (err: unknown) {
      throw new Error(getErrorMessage(err));
    }
  },
};
