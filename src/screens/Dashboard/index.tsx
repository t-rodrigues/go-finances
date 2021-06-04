import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/core';
import { useAuth } from '@/hooks/auth';
import { storageConfig } from '@/config/storage';

import HighlightCard from '@/components/HighlightCard';
import Load from '@/components/Load';
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
  EmptyTransactionsList,
  EmptyTransactionsListText,
} from './styles';

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
  const collectionFiltered = collection.filter(
    transaction => transaction.type === type,
  );

  if (!collectionFiltered.length) {
    return null;
  }

  const lastTransaction = new Date(
    Math.max(
      ...collectionFiltered.map(transaction =>
        new Date(transaction.date).getTime(),
      ),
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

  const { user, signOff } = useAuth();
  const dataKey = `${storageConfig.transactionsUserStorageKey + user.id}`;

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(dataKey);
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

    const totalInterval = lastTransactionExpensive
      ? `1 à ${lastTransactionExpensive}`
      : null;

    const total = entriesTotal - expensiveTotal;

    const lastTransactionEntrieDate = lastTransactionEntries
      ? `Última entrada dia ${lastTransactionEntries}`
      : 'Nenhuma transação de entrada registrada';
    const lastTransactionExpensiveDate = lastTransactionExpensive
      ? `Última saída dia ${lastTransactionEntries}`
      : 'Nenhuma transação de saída registrada';

    setHighlightData({
      entries: {
        amount: Number(entriesTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: lastTransactionEntrieDate as string,
      },
      expensive: {
        amount: Number(expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: lastTransactionExpensiveDate as string,
      },
      total: {
        amount: Number(total).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: totalInterval as string,
      },
    });

    setIsLoading(false);
  }

  const handleSignOff = async () => {
    await signOff();
  };

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
                    uri: user.avatar,
                  }}
                />

                <User>
                  <UserGreetings>Olá,</UserGreetings>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogOut onPress={handleSignOff}>
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
              ListEmptyComponent={() => (
                <EmptyTransactionsList>
                  <EmptyTransactionsListText>
                    Nada para exibir aqui
                  </EmptyTransactionsListText>
                </EmptyTransactionsList>
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
