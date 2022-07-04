import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { token } from '@src/graphql/reactiveVariables';

const httpLink = createHttpLink({
  uri: 'https://api-dev.foodstyles.com/graphql',
});

const interceptRequest = setContext(async (_, context) => ({
  ...context,
  headers: {
    ...context.headers,
    ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
  },
}));

export const client = new ApolloClient({
  link: interceptRequest.concat(httpLink),
  cache: new InMemoryCache(),
});
