import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/core';
import { useAuth } from '@/hooks/auth';

import HistoryCard from '@/components/HistoryCard';
import { TransactionCardProps } from '@/components/TransactionCard';
import Load from '@/components/Load';

import { storageConfig } from '@/config/storage';
import { categories } from '@/utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  Chart,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  NoData,
  NoDataLabel,
} from './styles';

type Expensive = {
  key: string;
  name: string;
  amount: string;
  total: number;
  color: string;
  percent: number;
  percentFormatted: string;
};

interface TransactionData extends TransactionCardProps {
  total: number;
}

const Summary = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expensiveByCategory, setExpensiveByCategory] = useState<Expensive[]>(
    [],
  );
  const { user } = useAuth();

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `${storageConfig.transactionsUserStorageKey + user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionData[] = response
      ? JSON.parse(response)
      : [];

    const expensive = responseFormatted.filter(
      item =>
        item.type === 'outcome' &&
        new Date(item.date).getMonth() === selectedDate.getMonth(),
    );

    const expensiveTotal = expensive.reduce(
      (accumulator: number, item: TransactionData) =>
        accumulator + Number(item.amount),
      0,
    );

    const totalByCategory: Expensive[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensive.forEach((item: TransactionData) => {
        if (item.category === category.key) {
          categorySum += Number(item.amount);
        }
      });

      if (categorySum > 0) {
        const amount = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = (categorySum / expensiveTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          amount,
          total: categorySum,
          percent,
          percentFormatted,
        });
      }
    });

    setExpensiveByCategory(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate]),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      {isLoading ? (
        <Load size="large" />
      ) : (
        <Content>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMM, yyyy', {
                locale: ptBR,
              })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          {expensiveByCategory.length ? (
            <>
              <Chart>
                <VictoryPie
                  data={expensiveByCategory}
                  colorScale={expensiveByCategory.map(
                    category => category.color,
                  )}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: 'bold',
                      fill: theme.colors.shape,
                    },
                  }}
                  labelRadius={50}
                  x="percentFormatted"
                  y="total"
                />
              </Chart>

              {expensiveByCategory.map(expensive => (
                <HistoryCard
                  key={expensive.key}
                  title={expensive.name}
                  amount={expensive.amount}
                  color={expensive.color}
                />
              ))}
            </>
          ) : (
            <NoData>
              <NoDataLabel>Sem itens para exibir</NoDataLabel>
            </NoData>
          )}
        </Content>
      )}
    </Container>
  );
};

export default Summary;
