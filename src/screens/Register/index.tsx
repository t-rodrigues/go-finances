import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';

import Button from '@/components/Form/Button';
import CategorySelectInput from '@/components/Form/CategorySelectInput';
import InputForm from '@/components/Form/InputForm';
import TransactionTypeButton from '@/components/Form/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';
import CategorySelect from '../CategorySelect';
import { useAuth } from '@/hooks/auth';

interface FormData {
  name: string;
  amount: string;
}

const registerSchema = Yup.object().shape({
  name: Yup.string().min(3).required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
});

const Register = (): JSX.Element => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigation = useNavigation();

  const handleTransactionTypeSelect = (type: 'income' | 'outcome') => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async ({ name, amount }: FormData) => {
    if (!transactionType) return Alert.alert('Selecione o tipo de transação');
    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const newTransaction = {
      id: uuid.v4(),
      name,
      amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const transactions = data ? JSON.parse(data) : [];

      const dataFormatted = [...transactions, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: '',
      });
      setTransactionType('');
      reset();

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível salvar');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionType>
              <TransactionTypeButton
                type="income"
                onPress={() => handleTransactionTypeSelect('income')}
                isActive={transactionType === 'income'}
              >
                Entrada
              </TransactionTypeButton>

              <TransactionTypeButton
                type="outcome"
                onPress={() => handleTransactionTypeSelect('outcome')}
                isActive={transactionType === 'outcome'}
              >
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <CategorySelectInput
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
