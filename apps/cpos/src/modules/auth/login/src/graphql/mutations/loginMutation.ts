import { gql } from 'graphql-request';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!, $isAdmin: Boolean!) {
    login(
      credentials: {
        username: $username
        password: $password
        isAdmin: $isAdmin
      }
    ) {
      accessToken
      username
      isAdmin
    }
  }
`;
export interface LoginResponse {
  login: {
    accessToken: string;
    username: string;
    isAdmin: boolean;
  };
}
