import { graphQLClient } from '@gtpos/core';
import { LOGIN, LoginResponse } from './graphql/mutations/loginMutation';

export const LoginService = {
  getItems() {
    return [
      { id: 1, name: 'Item Apple', stock: 10 },
      { id: 2, name: 'Item Banana', stock: 5 },
      { id: 3, name: 'Item Cherry', stock: 8 },
    ];
  },

  async login(credentials: {
    username: string;
    password: string;
    isAdmin?: boolean;
  }) {
    const getErrorMessage = (err: unknown): string => {
      if (err instanceof Error) return err.message;
      if (typeof err === 'object' && err !== null) {
        const maybe = err as { response?: { errors?: { message?: string }[] } };
        const msg = maybe?.response?.errors?.[0]?.message;
        if (typeof msg === 'string') return msg;
      }
      return 'Login failed';
    };

    try {
      const data = await graphQLClient.request<LoginResponse>(LOGIN, {
        username: credentials.username,
        password: credentials.password,
        isAdmin: credentials.isAdmin ?? false,
      });

      // store token
      localStorage.setItem('accessToken', data.login.accessToken);

      // you can return the user data (optional)
      return data.login;
    } catch (err: unknown) {
      console.error('❌ GraphQL Login Error:', err);
      throw new Error(getErrorMessage(err));
    }
  },
};
