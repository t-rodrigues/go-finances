import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

type IconProps = {
  type: 'income' | 'outcome';
};

interface ButtonProps extends IconProps {
  isActive: boolean;
}

export const Container = styled.View<ButtonProps>`
  width: 48%;

  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 8px;

  ${({ isActive, type }) =>
    isActive &&
    type === 'income' &&
    css`
      background-color: ${({ theme }) => theme.colors.successLight};
      border-color: ${({ theme }) => theme.colors.successLight};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === 'outcome' &&
    css`
      background-color: ${({ theme }) => theme.colors.attentionLight};
      border-color: ${({ theme }) => theme.colors.attentionLight};
    `}
`;

export const Button = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 16px;

  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;
