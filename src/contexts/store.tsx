import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageContextData = {
  setItem: (storageKey: string, data: any) => Promise<void>;
  getItem: (storageKey: string) => Promise<string | null>;
  removeItem: (storageKey: string) => Promise<void>;
};

type StorageProviderProps = {
  children: React.ReactNode;
};

// export const StorageContextDefaultValues: StorageContextData = {
//   setItem: async () => null,
//   getItem: async () => '',
//   removeItem: async () => null,
//   loading: false,
// };

const StorageContext = createContext<StorageContextData>(
  {} as StorageContextData,
);

const StorageProvider = ({ children }: StorageProviderProps) => {
  const setItem = async (storageKey: string, data: any) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
  };

  const getItem = async (storageKey: string) => {
    return await AsyncStorage.getItem(storageKey);
  };

  const removeItem = async (storageKey: string) => {
    await AsyncStorage.removeItem(storageKey);
  };

  return (
    <StorageContext.Provider value={{ setItem, getItem, removeItem }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
