import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '@/assets/logo.svg';
import Google from '@/assets/google.svg';
import Apple from '@/assets/apple.svg';

import SignInSocialButton from '@/components/SignInSocialButton';
import Load from '@/components/Load';
import { useAuth } from '@/hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  Description,
  Footer,
  FooterWrapper,
} from './styles';

const SignIn = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);

    try {
      return await signInWithGoogle();
    } catch (error) {
      console.error(error.message);

      Alert.alert('Errou!', error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleWrapper>

        <Description>Faça seu login com uma das contas abaixo</Description>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Google"
            svg={Google}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton title="Apple" svg={Apple} />
          )}
        </FooterWrapper>

        {isLoading && <Load size="large" />}
      </Footer>
    </Container>
  );
};

export default SignIn;
