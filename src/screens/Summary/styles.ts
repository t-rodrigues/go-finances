import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(80)}px;
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 20px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})`
  flex: 1;
  margin-bottom: 1px;
`;

export const Chart = styled.View`
  flex: 1;
  align-items: center;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const NoData = styled.View`
  /* margin-top: 60px; */
  flex: 1;
  align-items: center;
`;

export const NoDataLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;
