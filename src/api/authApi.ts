import axiosInstance from './axios';

export const loginApi = (username: string, password: string) => {
  return axiosInstance.post('/api/login', { username, password });
};
