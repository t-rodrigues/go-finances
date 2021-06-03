import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { TransactionsProps } from '.';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${RFPercentage(35)}px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
  /* margin-top: ${getStatusBarHeight()}px; */
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreetings = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const UserName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const LogOut = styled(BorderlessButton)``;

export const LogOffIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  margin-top: -${RFValue(130)}px;
  max-height: ${RFValue(210)}px;
`;

export const Transactions = styled.View`
  flex: 1;

  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};

  padding: 20px 0;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<TransactionsProps>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;
