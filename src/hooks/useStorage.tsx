import { useContext } from 'react';

import { StorageContext } from '@/contexts/store';

export const useStorage = () => {
  return useContext(StorageContext);
};
