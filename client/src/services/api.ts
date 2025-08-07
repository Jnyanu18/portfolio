import axios from 'axios';
import { PortfolioData, ContactForm, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const portfolioApi = {
  // Get portfolio data
  getPortfolio: async (): Promise<PortfolioData> => {
    try {
      const response = await api.get<PortfolioData>('/portfolio');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch portfolio data');
    }
  },

  // Submit contact form
  submitContact: async (contactData: ContactForm): Promise<ApiResponse> => {
    try {
      const response = await api.post<ApiResponse>('/contact', contactData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw new Error('Failed to submit contact form');
    }
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  },
};

export default api;