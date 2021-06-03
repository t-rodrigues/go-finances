import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Text, Button } from './styles';

interface Props extends RectButtonProps {
  type: 'income' | 'outcome';
  children: string;
  isActive: boolean;
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

const TransactionTypeButton = ({
  type,
  children,
  isActive,
  ...rest
}: Props): JSX.Element => {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon type={type} name={icon[type]} />
        <Text>{children}</Text>
      </Button>
    </Container>
  );
};

export default TransactionTypeButton;
