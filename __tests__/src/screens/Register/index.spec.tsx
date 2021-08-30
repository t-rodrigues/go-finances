import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';

import { AppProvider } from '@/contexts';
import Register from '@/screens/Register';

describe('Register', () => {
  const registerComponent = (
    <NavigationContainer>
      <Register />
    </NavigationContainer>
  );
  it('should open category modal when user click on the category button', async () => {
    const { getByTestId } = render(registerComponent, { wrapper: AppProvider });

    const modal = getByTestId('modal-category');
    const button = getByTestId('button-category');

    fireEvent.press(button);

    expect(modal.props.visible).toBeTruthy();
  });
});
