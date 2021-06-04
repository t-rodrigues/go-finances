import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuth } from '@/hooks/auth';

export const Routes = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
