import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Payment API endpoints
export const paymentApi = {
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
      const response = await api.post('/payments/capture-payment', { orderId, customerId });
      return response.data;
    } catch (error) {
      console.error('Error capturing payment:', error);
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