import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '@/screens/Profile';

describe('ProfileScreen', () => {
  it('should render InputText with correct placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputName = getByPlaceholderText('Nome');
    const inputLastName = getByPlaceholderText('Sobrenome');

    expect(inputName.props.placeholder).toBeTruthy();
    expect(inputLastName.props.placeholder).toBeTruthy();
  });

  it('should load user data', () => {
    const { getByTestId } = render(<Profile />);
    const input = getByTestId('input-surname');

    expect(input).toBeTruthy();
    expect(input.props.value).toBe('Rodrigues');
  });

  it('should render title correctly', async () => {
    const { getByTestId, getByText } = render(<Profile />);
    const title = getByTestId('profile-title');
    getByText('Profile');

    expect(title).toBeTruthy();
    expect(title.props.children).toContain('Profile');
  });
});
