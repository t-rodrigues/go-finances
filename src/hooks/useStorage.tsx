import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
  const setItem = async (storageKey: string, data: any) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
  };

  const getItem = async (storageKey: string) => {
    return AsyncStorage.getItem(storageKey);
  };

  const removeItem = async (storageKey: string) => {
    await AsyncStorage.removeItem(storageKey);
  };

  return { setItem, getItem, removeItem };
};
