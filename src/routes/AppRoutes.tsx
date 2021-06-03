import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import Dashboard from '@/screens/Dashboard';
import Register from '@/screens/Register';
import Summary from '@/screens/Summary';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 70,
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Listagem',
          tabBarBadge: 3,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Summary"
        component={Summary}
        options={{
          title: 'Resumo',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
