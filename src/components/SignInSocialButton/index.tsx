import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Container, SvgContainer, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}: Props): JSX.Element => {
  return (
    <Container {...rest}>
      <SvgContainer>
        <Svg />
      </SvgContainer>
      <Title>Entrar com {title}</Title>
    </Container>
  );
};

export default SignInSocialButton;
