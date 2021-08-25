import React, { createContext, useEffect, useState } from 'react';
import { makeRedirectUri, startAsync } from 'expo-auth-session';

import { storageConfig } from '@/config';
import { useStorage } from '@/hooks';
import { api } from '@/services/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: 'cancel' | 'dismiss' | 'success';
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

type AuthContextData = {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signOff: () => Promise<void>;
  userStorageLoading: boolean;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const { setItem, getItem, removeItem } = useStorage();

  const { userStorageKey } = storageConfig;

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
        const accessToken = params['access_token'];
        api.defaults.headers.authorization = `Bearer ${accessToken}`;

        const { data } = await api.get<UserResponse>('/userinfo');
        const userData = {
          id: data.id,
          email: data.email,
          name: data.name,
          avatar: data.picture,
        };

        setUser(userData);
        await setItem(userStorageKey, { user: userData, token: accessToken });
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
      await removeItem(userStorageKey);

      delete api.defaults.headers.authorization;
      setUser({} as User);
    } catch (error) {
      throw new Error(error);
    } finally {
      setUserStorageLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const response = await getItem(userStorageKey);

      if (response) {
        const { user: userData, token } = JSON.parse(response) as UserStore;

        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(userData);
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
