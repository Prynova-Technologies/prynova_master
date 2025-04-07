import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Payment API endpoints
export const paymentApi = {
  // Get all payments with optional filters
  getAllPayments: async (filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.startDate) queryParams.append('startDate', filters.startDate);
      if (filters?.endDate) queryParams.append('endDate', filters.endDate);
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await api.get(`/payments?${queryParams.toString()}`);
      // console.log(response.data.payments)
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  // Create a PayPal order
  createOrder: async (customerId: string) => {
    try {
      const response = await api.post('/payments/create-order', { customerId });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Capture a PayPal payment
  capturePayment: async (orderId: string, customerId: string) => {
    try {
      // Log the capture attempt for debugging
      console.log('Attempting to capture payment:', { orderId, customerId });
      
      const response = await api.post('/payments/capture-payment', { orderId, customerId });
      
      // Log successful response
      console.log('Payment capture successful:', response.data);
      return response.data;
    } catch (error) {
      // Enhanced error logging
      console.error('Error capturing payment:', error);
      
      // Log detailed error information
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
      
      throw error;
    }
  },

  // Get subscription details
  getSubscriptionDetails: async (customerId: string) => {
    try {
      const response = await api.get(`/payments/subscription/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting subscription details:', error);
      throw error;
    }
  },

  // Get payment details by ID
  getPaymentById: async (paymentId: string) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting payment details:', error);
      throw error;
    }
  }
};

// Customer API endpoints
export const customerApi = {
  // Get customer by ID
  getCustomerById: async (customerId: string) => {
    try {
      const response = await api.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting customer:', error);
      throw error;
    }
  },

  // Get customer database information
  getCustomerDBInfo: async (customerId: string, companyName: string) => {
    try {
      const response = await api.get(`/sync/db-info?customerId=${customerId}&businessName=${encodeURIComponent(companyName)}`);
      
      return response.data;
      
    } catch (error) {
      console.error('Error getting database information:', error);
      throw error;
    }
  }
};

export default api;