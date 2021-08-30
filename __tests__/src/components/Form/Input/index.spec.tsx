import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { render } from '@testing-library/react-native';

import Input from '@/components/Form/Input';
import { theme } from '@/global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Input', () => {
  it('must have specific border color when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        active
      />,
      {
        wrapper: Providers,
      },
    );

    const inputComponent = getByTestId('input-email');

    expect(inputComponent).toBeTruthy();
    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention,
    );
  });
});
