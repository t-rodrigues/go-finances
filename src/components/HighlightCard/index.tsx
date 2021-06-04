import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from './styles';

interface Props {
  type: 'income' | 'outcome' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign',
};

const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  type,
}: Props): JSX.Element => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Content>
        <Amount type={type}>{amount}</Amount>
        {lastTransaction && (
          <LastTransaction type={type}>{lastTransaction}</LastTransaction>
        )}
      </Content>
    </Container>
  );
};

export default HighlightCard;
