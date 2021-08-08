import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '@/assets/logo.svg';
import Google from '@/assets/google.svg';
import Apple from '@/assets/apple.svg';

import SignInSocialButton from '@/components/SignInSocialButton';
import Load from '@/components/Load';

import { useAuth } from '@/hooks';

import * as S from './styles';

export const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Errou!', error.message);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <S.Title>Controle suas finanças de forma muito simples</S.Title>
        </S.TitleWrapper>

        <S.Description>Faça seu login com uma das contas abaixo</S.Description>
      </S.Header>
      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Google"
            svg={Google}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton title="Apple" svg={Apple} />
          )}
        </S.FooterWrapper>

        {isLoading && <Load size="large" />}
      </S.Footer>
    </S.Container>
  );
};
