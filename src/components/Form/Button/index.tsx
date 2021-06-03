import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Text } from './styles';

interface Props extends RectButtonProps {
  children: string;
  onPress: () => void;
}

const Button = ({ children, onPress, ...rest }: Props): JSX.Element => {
  return (
    <Container onPress={onPress} {...rest}>
      <Text>{children}</Text>
    </Container>
  );
};

export default Button;
