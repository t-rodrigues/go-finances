import React from 'react';

import { Container, Title, Amount } from './styles';

type Props = {
  color: string;
  title: string;
  amount: string;
};

const HistoryCard = ({ color, title, amount }: Props): JSX.Element => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export default HistoryCard;
