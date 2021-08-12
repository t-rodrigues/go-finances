import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type Props = TextInputProps & {
  active?: boolean;
};

const Input = ({ active = false, ...rest }: Props): JSX.Element => {
  return <Container active={active} {...rest} />;
};

export default Input;
