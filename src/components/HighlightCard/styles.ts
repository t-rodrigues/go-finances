import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type TypeProps = {
  type: 'income' | 'outcome' | 'total';
};

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 8px;
  padding: 20px 24px;
  padding-bottom: ${RFValue(40)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === 'income' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === 'outcome' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ type }) =>
    type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Content = styled.View`
  margin-top: 38px;
`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;
