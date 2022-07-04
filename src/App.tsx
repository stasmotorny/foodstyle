import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { HomeViewApollo } from '@src/screens/home/homeViewApollo';
import { LOG_IN } from './graphql/mutations';
import { token } from './graphql/reactiveVariables';

const App = () => {
  const [login, { error: loginError, data: loginData }] = useMutation(LOG_IN, {
    variables: {
      email: 'dev225324@gmail.com',
      password: 'securePassword',
    },
  });

  useEffect(() => {
    const handleLogin = async () => {
      try {
        await login();
      } catch (e) {
        console.log('LOGIN_ERROR', loginError);
      }
    };

    handleLogin();
  }, []);

  useEffect(() => {
    if (loginData) {
      token(loginData.loginWithEmail.accessToken);
      console.log('TOKEN', loginData.loginWithEmail.accessToken);
    }
  }, [loginData]);

  return <HomeViewApollo />;
};

export default App;
