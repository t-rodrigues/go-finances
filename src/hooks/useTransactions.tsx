import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TransactionCardProps } from '@/components/TransactionCard';
import { storageConfig } from '@/config';
import { useAuth } from './useAuth';

type TransactionsProps = TransactionCardProps & {
  id: string;
};

type HighlightProps = {
  amount: string;
  date: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
};

export const useTransactions = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  );

  const loadTransactionsData = async () => {
    setIsLoading(true);
    const { transactionsUserStorageKey } = storageConfig;
    const response = await AsyncStorage.getItem(
      transactionsUserStorageKey + user.id,
    );
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

  return {
    getLastTransactionDate,
    loadTransactionsData,
    highlightData,
    transactions,
    isLoading,
  };
};
