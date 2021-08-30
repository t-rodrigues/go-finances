import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 70%;
  justify-content: flex-end;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TitleWrapper = styled.View`
  padding: 0 40px;

  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;
  margin: 40px 0;
`;

export const Description = styled(Title)`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  padding: 0 80px;

  margin-top: 40px;
  margin-bottom: 60px;
`;

export const Footer = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;

  justify-content: space-between;
`;
