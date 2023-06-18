import { LoginRequest, User } from '@tbcc/models';
import { AUTH_ENDPOINT } from './auth.const';
import { apiClient } from '../api-client';

const login = (body: LoginRequest): Promise<void> => {
  return apiClient.post<void>(AUTH_ENDPOINT.login, body);
};

const logout = (): Promise<void> => {
  return apiClient.post(AUTH_ENDPOINT.logout);
};

const getUser = (): Promise<User> => {
  return apiClient.getData(AUTH_ENDPOINT.user);
};

export const authService = {
  getUser,
  login,
  logout,
};
