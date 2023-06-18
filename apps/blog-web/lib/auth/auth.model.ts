import { UseMutationResult } from '@tanstack/react-query';
import type { LoginRequest, User } from '@tbcc/models';

export type AuthContextValue = {
  user: User | undefined;
  isAuthenticated: boolean;
  isError: boolean;
  isLoading: boolean;
  loginMutation: UseMutationResult<void, Error, LoginRequest>;
  logoutMutation: UseMutationResult<void, Error, void>;
};
