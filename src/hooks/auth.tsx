import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signOff: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '1074067499946-enj0bdi98kbjqa9idmmnsl3eck51k8h9.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          name: String(result.user.name),
          email: String(result.user.email),
          avatar: String(result.user.photoUrl),
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOff = async () => {
    await AsyncStorage.removeItem(userStorageKey);
    setUser({} as User);
  };

  useEffect(() => {
    async function loadUser() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;

        setUser(userLogged);
      }
    }

    loadUser();
    setUserStorageLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOff, userStorageLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
