import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import { Container } from './styles';

type Props = {
  size: 'small' | 'large';
};

const Load = ({ size }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Container>
      <ActivityIndicator color={theme.colors.primary} size={size} />
    </Container>
  );
};

export default Load;
