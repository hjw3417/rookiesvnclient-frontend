import { loginApi } from '../api/authApi';

export const login = async (username: string, password: string): Promise<string> => {
  const response = await loginApi(username, password);
  return response.data.token;
};
