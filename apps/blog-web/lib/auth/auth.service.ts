import { LoginRequest, User } from '@tbcc/models';
import { AUTH_ENDPOINT } from './auth.const';
import { apiClient } from '../api-client';

const login = async (body: LoginRequest): Promise<void> => {
  await apiClient.post(AUTH_ENDPOINT.login, body);
};

const logout = async (): Promise<void> => {
  await apiClient.post(AUTH_ENDPOINT.logout);
};

const getUser = async (): Promise<User> => {
  const response = await apiClient.get(AUTH_ENDPOINT.user);
  return response.json();
};

export const authService = {
  getUser,
  login,
  logout,
};
