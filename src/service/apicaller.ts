import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SHAPE_BACKEND_URL } from '../config';

const JSONType = 'application/json';
const DEFAULT_TIMEOUT = 60000;

interface AxiosConfig extends AxiosRequestConfig {
  headers: { 'Content-Type': typeof JSONType | 'multipart/form-data'; Authorization?: string };
};

const createAxios = (config: AxiosConfig): AxiosInstance => {
  return Axios.create(config);
};

const isLocalhost = () => window.location.host.includes('localhost');

const getBackendUrl = () => {
  return SHAPE_BACKEND_URL;
};

export const apiCaller = () => {
  const token = localStorage.getItem('Authorization');
  const axiosInstance = createAxios({
    baseURL: getBackendUrl(),
    timeout: DEFAULT_TIMEOUT,
    headers: { 'Content-Type': JSONType, Authorization: `${token == null ? '' : token}` },
  });
  return axiosInstance;
};

export const apiAuthCaller = (timeout = DEFAULT_TIMEOUT): AxiosInstance => {
  const token = localStorage.getItem('access_token');
  const axiosInstance = createAxios({
    baseURL: getBackendUrl(),
    timeout,
    headers: {
      "Content-Type": JSONType,
      Authorization: token ? `Bearer ${token}` : ''
    },
    withCredentials: false, // !isLocalhost(),
  });
  return axiosInstance;
};