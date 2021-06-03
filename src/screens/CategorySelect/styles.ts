import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import { Category as CategoriesListProps } from '.';

type CategoryProps = {
  isActive: boolean;
};

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${RFValue(110)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 20px;
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<CategoriesListProps>,
)`
  flex: 1;
`;

export const Category = styled(RectButton)<CategoryProps>`
  padding: ${RFValue(16)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondaryLight : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  border-radius: 8px;
  padding: 0 24px;
  padding-bottom: 24px;
`;
