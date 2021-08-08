import React from 'react';

import { categories } from '@/utils/categories';

import Button from '@/components/Form/Button';

import * as S from './styles';

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
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <S.CategoriesList
        data={categories}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button activeOpacity={0.7} onPress={closeSelectCategory}>
          Selecionar
        </Button>
      </S.Footer>
    </S.Container>
  );
};

export default CategorySelect;
