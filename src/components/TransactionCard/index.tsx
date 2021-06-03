import { categories } from '@/utils/categories';
import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryIcon,
  CategoryDescription,
  Date,
} from './styles';

export type TransactionCardProps = {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
};

type Props = {
  data: TransactionCardProps;
};

const TransactionCard = ({ data }: Props): JSX.Element => {
  const category = categories.find(item => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <CategoryIcon name={category!.icon} />
          <CategoryDescription>{category!.name}</CategoryDescription>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
