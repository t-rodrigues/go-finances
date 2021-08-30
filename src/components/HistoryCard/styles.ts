import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = {
  color: string;
};

export const Container = styled.View<Props>`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;

  border-left-width: 4px;
  border-left-color: ${({ color }) => color};

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;
