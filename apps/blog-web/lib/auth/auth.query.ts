import type { User } from '@tbcc/models';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { AUTH_CACHE_KEYS } from './auth.const';
import { authService } from './auth.service';

export const useAuthUserQuery = (
  options?: UseQueryOptions<User, Error>
): UseQueryResult<User, Error> => {
  return useQuery<User, Error>(
    AUTH_CACHE_KEYS.authUser,
    authService.getUser,
    options
  );
};
