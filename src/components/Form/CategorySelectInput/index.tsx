import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface Props extends RectButtonProps {
  title: string;
}

const CategorySelectInput = ({ title, ...rest }: Props): JSX.Element => {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectInput;
