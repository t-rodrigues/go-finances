import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 16px;
  border-radius: 8px;
`;

export const SvgContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};

  flex: 1;
  text-align: center;
`;
