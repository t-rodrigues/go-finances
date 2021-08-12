import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)<{ active: boolean }>`
  width: 100%;
  padding: 18px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;

  margin-bottom: 8px;

  ${({ active, theme }) =>
    active &&
    css`
      border-width: 3px;
      border-color: ${theme.colors.attention};
    `}
`;
