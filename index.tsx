import { AppRegistry } from 'react-native';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@root/apolloClient';
import App from './src/App';
import { name as appName } from './app.json';

const AppWithWrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppWithWrapper);
