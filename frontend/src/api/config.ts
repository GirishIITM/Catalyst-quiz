import axios from 'axios';
import { authStore } from '@/states/auth';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.msg === "Token has expired"
    ) {
      authStore.getState().logout();
      
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
