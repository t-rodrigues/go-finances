import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, startAsync } from 'expo-auth-session';

import { storageConfig } from '@/config';
import { api } from '@/services/api';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

type UserResponse = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type UserStore = {
  user: User;
  token: string;
};

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signOff: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [userToken, setUserToken] = useState('');
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const { userStorageKey, transactionsUserStorageKey } = storageConfig;

  const signInWithGoogle = async () => {
    setUserStorageLoading(true);

    try {
      const { GOOGLE_AUTH_ENDPOINT } = process.env;
      const { GOOGLE_CLIENT_ID } = process.env;
      const REDIRECT_URI = makeRedirectUri({ useProxy: true });
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl =
        GOOGLE_AUTH_ENDPOINT +
        `?client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}` +
        `&response_type=${RESPONSE_TYPE}` +
        `&scope=${SCOPE}`;

      const { type, params } = (await startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success') {
        try {
          const accessToken = params['access_token'];

          setUserToken(accessToken);
          api.defaults.headers.authorization = `Bearer ${accessToken}`;

          const { data } = await api.get<UserResponse>('/userinfo');
          const userData = {
            id: data.id,
            email: data.email,
            name: data.name,
            avatar: data.picture,
          };

          setUser(userData);
          await AsyncStorage.setItem(
            userStorageKey,
            JSON.stringify({ user: userData, token: accessToken }),
          );
        } catch (error) {
          Alert.alert('Error', JSON.stringify(error));
        }
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setUserStorageLoading(false);
    }
  };

  const signOff = async () => {
    setUserStorageLoading(true);

    try {
      await AsyncStorage.multiRemove([
        userStorageKey,
        `${transactionsUserStorageKey + user.id}`,
      ]);

      setUserToken('');
      setUser({} as User);
      delete api.defaults.headers.authorization;
    } catch (error) {
      throw new Error(error);
    } finally {
      setUserStorageLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const { userStorageKey } = storageConfig;
      const response = await AsyncStorage.getItem(userStorageKey);

      if (response) {
        const { user, token } = JSON.parse(response) as UserStore;
        console.log({ user, token });
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(user);
        setUserToken(token);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOff, userStorageLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
