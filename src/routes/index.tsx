import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@/hooks';
import { AuthRoutes } from '@/routes/AuthRoutes';
import { AppRoutes } from '@/routes/AppRoutes';

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
