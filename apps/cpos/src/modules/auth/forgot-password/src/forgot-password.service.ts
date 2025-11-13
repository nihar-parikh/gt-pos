import { graphQLClient } from '@gtpos/core';
import {
  SENDOTP,
  SendOtpResponse,
} from './graphql/mutations/ForgotPasswordMutation';

export const ForgotPasswordService = {
  async sendOtp(phone: string) {
    const getErrorMessage = (err: unknown): string => {
      if (err && typeof err === 'object') {
        const error = err as {
          response?: { errors?: { message: string }[] };
          message?: string;
        };
        const msg =
          error.response?.errors?.[0]?.message ||
          error.message ||
          'Send OTP failed';
        return msg;
      }
      return 'Send OTP failed';
    };
    try {
      const data = await graphQLClient.request<SendOtpResponse>(SENDOTP, {
        phone,
      });

      return data.sendOtp;
    } catch (err: unknown) {
      throw new Error(getErrorMessage(err));
    }
  },
};
