import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createContext } from 'react';

import type { AuthContextValue } from './auth.model';
import { useLoginMutation, useLogoutMutation } from './auth.mutation';
import { useAuthUserQuery } from './auth.query';

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  isAuthenticated: false,
  isError: false,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  loginMutation: undefined!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  logoutMutation: undefined!,
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const queryClient = useQueryClient();

  const {
    data: user,
    refetch: refetchAuthUser,
    status: authStatus,
  } = useAuthUserQuery({
    // TODO: initial data?
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    /**
     * The user data would only change as side effect of a mutation, in which case we
     * will manually invalidate the cache so that the query can be fetched again
     */
    staleTime: Infinity,
  });

  const isError = authStatus === 'error';
  const isLoading = authStatus === 'loading';
  const isAuthenticated = !!user && !isLoading;

  const loginMutation = useLoginMutation({
    onSuccess: async () => {
      return refetchAuthUser();
    },
  });

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isError,
      isLoading,
      loginMutation,
      logoutMutation,
    }),
    [user, isAuthenticated, isError, isLoading, loginMutation, logoutMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
