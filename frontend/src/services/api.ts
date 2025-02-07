import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const verifyPhone = async (phone: string) => {
  const response = await api.post('/user/verify/phone', { phone });
  return response.data;
};

export const verifyOTP = async (phone: string, otp: string) => {
  const response = await api.post('/user/verify/otp', { phone, otp });
  return response.data;
};

export const updateUserProfile = async (formData: FormData) => {
  const response = await api.put('/user/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get('/user/info');
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get('/category/all');
  return response.data;
};

export const updateUserCategories = async (categories: string[]) => {
  const response = await api.put('/user/categories', { categories });
  return response.data;
};