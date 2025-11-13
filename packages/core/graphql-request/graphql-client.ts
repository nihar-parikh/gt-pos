import { GraphQLClient } from 'graphql-request';

const apiUrl = import.meta.env.VITE_API_URL;
export const graphQLClient = new GraphQLClient(`${apiUrl}/graphql`, {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  },
});
