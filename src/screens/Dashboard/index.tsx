import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/core';

import HighlightCard from '@/components/HighlightCard';
import TransactionCard, {
  TransactionCardProps,
} from '@/components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  LogOffIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogOut,
} from './styles';
import Load from '@/components/Load';

export interface TransactionsProps extends TransactionCardProps {
  id: string;
}

type HighlightProps = {
  amount: string;
  date: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
};

function getLastTransactionDate(
  collection: TransactionsProps[],
  type: 'income' | 'outcome',
) {
  const lastTransaction = new Date(
    Math.max(
      ...collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime()),
    ),
  ).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  });

  return lastTransaction;
}

const Dashboard = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    null as unknown as HighlightData,
  );

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: TransactionsProps[] = transactions.map(
      (item: TransactionsProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        if (item.type === 'income') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        return {
          ...item,
          amount,
          date,
        };
      },
    );

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'income',
    );

    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      'outcome',
    );

    const totalInterval = `1 à ${lastTransactionExpensive}`;
    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: Number(entriesTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: Number(expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: `Última saída dia ${lastTransactionEntries}`,
      },
      total: {
        amount: Number(total).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <Load size="large" />
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/34174188?v=4',
                  }}
                />

                <User>
                  <UserGreetings>Olá,</UserGreetings>
                  <UserName>Thiago</UserName>
                </User>
              </UserInfo>
              <LogOut>
                <LogOffIcon name="power" />
              </LogOut>
            </UserWrapper>
          </Header>

          {highlightData && (
            <HighlightCards>
              <HighlightCard
                type="income"
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.date}
              />

              <HighlightCard
                type="outcome"
                title="Saídas"
                amount={highlightData.expensive.amount}
                lastTransaction={highlightData.expensive.date}
              />

              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.date}
              />
            </HighlightCards>
          )}

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              renderItem={({ item }) => <TransactionCard data={item} />}
              keyExtractor={item => item.id}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
