import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { LoginRequest } from '@tbcc/models';

import { authService } from './auth.service';

type MutationOptions = Parameters<typeof useMutation>[2];

export const useLoginMutation = (
  options?: UseMutationOptions<void, Error, LoginRequest>
) => {
  return useMutation<void, Error, LoginRequest, unknown>(
    authService.login,
    options
  );
};

export const useLogoutMutation = (options?: MutationOptions) => {
  return useMutation<void, Error, void, unknown>(authService.logout, options);
};
