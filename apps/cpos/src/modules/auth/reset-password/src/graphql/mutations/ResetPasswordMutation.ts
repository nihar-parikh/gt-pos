import { gql } from 'graphql-request';

export const RESETPASSWORD = gql`
  mutation resetPassword(
    $phone: String!
    $resetToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      input: {
        phone: $phone
        resetToken: $resetToken
        newPassword: $newPassword
      }
    ) {
      message
    }
  }
`;

export interface ResetPasswordResponse {
  resetPassword: {
    message: string;
  };
}
