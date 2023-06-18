import { useContext } from 'react';

import { AuthContext } from './auth.provider';
import { AuthContextValue } from './auth.model';

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('Add AuthProvider to the root component');
  }

  return ctx;
};
