import axiosInstance from './axios';

export interface LoginResponse {
  token: string;
}

export const loginApi = (username: string, password: string) => {
  return axiosInstance.post<LoginResponse>('/api/login', { username, password });
};
