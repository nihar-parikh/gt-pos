import { gql } from 'graphql-request';

export const VERIFYOTP = gql`
  mutation verifyOtp($phone: String!, $otp: String!) {
    verifyOtp(input: { phone: $phone, otp: $otp }) {
      token
      message
    }
  }
`;

export interface VerifyOtpResponse {
  verifyOtp: {
    token: string;
    message: string;
  };
}
