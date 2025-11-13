import { gql } from 'graphql-request';

export const SENDOTP = gql`
  mutation sendOtp($phone: String!) {
    sendOtp(input: { phone: $phone }) {
      expiresTime
      otp
    }
  }
`;
export interface SendOtpResponse {
  sendOtp: {
    expiresTime: number;
    otp: string;
  };
}
