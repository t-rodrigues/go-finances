import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@/global/styles/theme';
import { AuthProvider } from '@/contexts/auth';

type Props = {
  children: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
