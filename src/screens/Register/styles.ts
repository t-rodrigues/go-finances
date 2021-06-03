import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

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

export const Form = styled.View`
  flex: 1;
  padding: 0 24px;
  justify-content: space-between;
  margin: 24px 0;
`;

export const Fields = styled.View``;

export const TransactionType = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`;
