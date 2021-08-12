import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export const Profile = () => {
  return (
    <View>
      <Text testID="profile-title">Profile</Text>
      <TextInput testID="input-name" placeholder="Nome" autoCorrect={false} />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Rodrigues"
      />

      <Button title="Teste" onPress={() => {}} />
    </View>
  );
};
