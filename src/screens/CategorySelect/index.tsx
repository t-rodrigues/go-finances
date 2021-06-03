import React from 'react';

import { categories } from '@/utils/categories';

import Button from '@/components/Form/Button';

import {
  Container,
  Header,
  Title,
  CategoriesList,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

export type Category = {
  key: string;
  name: string;
  icon: string;
};

type CategorySelectProps = {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps): JSX.Element => {
  const handleCategorySelect = (category: Category) => {
    setCategory(category);
  };

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <CategoriesList
        data={categories}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button activeOpacity={0.7} onPress={closeSelectCategory}>
          Selecionar
        </Button>
      </Footer>
    </Container>
  );
};

export default CategorySelect;
