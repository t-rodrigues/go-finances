import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '@/screens/Dashboard';
import Register from '@/screens/Register';
import Summary from '@/screens/Summary';

export const AppRoutes = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Register" component={Register} />
      <Screen name="Summary" component={Summary} />
    </Navigator>
  );
};
