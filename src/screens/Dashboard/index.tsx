import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useAuth, useTransactions } from '@/hooks';

import HighlightCard from '@/components/HighlightCard';
import Load from '@/components/Load';
import TransactionCard, {
  TransactionCardProps,
} from '@/components/TransactionCard';

import * as S from './styles';

export type TransactionsProps = TransactionCardProps & {
  id: string;
};

const Dashboard = () => {
  const { isLoading, transactions, highlightData, loadTransactionsData } =
    useTransactions();

  const { user, signOff } = useAuth();

  const handleSignOff = async () => {
    await signOff();
  };

  useEffect(() => {
    loadTransactionsData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactionsData();
    }, []),
  );

  return (
    <S.Container>
      {isLoading ? (
        <Load size="large" />
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>
              <S.UserInfo>
                <S.Photo
                  source={{
                    uri: user.avatar,
                  }}
                />

                <S.User>
                  <S.UserGreetings>Olá,</S.UserGreetings>
                  <S.UserName>{user.name}</S.UserName>
                </S.User>
              </S.UserInfo>
              <S.LogOut onPress={handleSignOff}>
                <S.LogOffIcon name="power" />
              </S.LogOut>
            </S.UserWrapper>
          </S.Header>

          {highlightData && (
            <S.HighlightCards>
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
            </S.HighlightCards>
          )}

          <S.Transactions>
            <S.Title>Listagem</S.Title>

            <S.TransactionsList
              data={transactions}
              renderItem={({ item }) => <TransactionCard data={item} />}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <S.EmptyTransactionsList>
                  <S.EmptyTransactionsListText>
                    Nada para exibir aqui
                  </S.EmptyTransactionsListText>
                </S.EmptyTransactionsList>
              )}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};

export default Dashboard;
