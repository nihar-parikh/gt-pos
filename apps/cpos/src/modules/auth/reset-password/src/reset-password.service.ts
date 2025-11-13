import { graphQLClient } from '@gtpos/core';
import {
  RESETPASSWORD,
  ResetPasswordResponse,
} from './graphql/mutations/ResetPasswordMutation';

export const ResetPasswordService = {
  async resetPassword(phone: string, resetToken: string, newPassword: string) {
    const getErrorMessage = (err: unknown): string => {
      if (err && typeof err === 'object') {
        const error = err as {
          response?: { errors?: { message: string }[] };
          message?: string;
        };
        const msg =
          error.response?.errors?.[0]?.message ||
          error.message ||
          'Password reset failed';
        return msg;
      }
      return 'Password reset failed';
    };
    try {
      const data = await graphQLClient.request<ResetPasswordResponse>(
        RESETPASSWORD,
        {
          phone,
          resetToken,
          newPassword,
        }
      );

      return data.resetPassword;
    } catch (err: unknown) {
      throw new Error(getErrorMessage(err));
    }
  },
};
