import { LoginRequest, User } from '@tbcc/models';
import { AUTH_ENDPOINT } from './auth.const';
import { apiClient } from '../api-client';

const handleResponse = (res: Response): void => {
  if (res.status >= 300) {
    throw new Error();
  }
};

const login = async (body: LoginRequest): Promise<void> => {
  const response = await apiClient.post(AUTH_ENDPOINT.login, body);
  handleResponse(response);
};

const logout = async (): Promise<void> => {
  const response = await apiClient.post(AUTH_ENDPOINT.logout);
  handleResponse(response);
};

const getUser = async (): Promise<User> => {
  const response = await apiClient.get(AUTH_ENDPOINT.user);
  handleResponse(response);
  return response.json();
};

export const authService = {
  getUser,
  login,
  logout,
};
