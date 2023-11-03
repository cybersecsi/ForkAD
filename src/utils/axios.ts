import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { API_CONFIG } from '@/config';

const baseURL = API_CONFIG.BASE_API;

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const loggedInstance = (): AxiosInstance => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const instance = axios.create({
    baseURL: baseURL,
    headers: headers as AxiosRequestHeaders,
    withCredentials: true,
  });
  return instance;
};

export const http = instance;
export const cookieHttp = loggedInstance;
