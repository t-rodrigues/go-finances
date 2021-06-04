/* eslint-disable camelcase */
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { theme } from '@/global/styles/theme';
import { AuthProvider, useAuth } from '@/hooks/auth';

import { Routes } from '@/routes';

const GoFinances = (): JSX.Element => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default GoFinances;
