import api from './api';

export interface Customer {
  id: string;
  companyName: string;
  email: string;
  contactPhone: string;
  contactPerson: string;
  subscribedApp: string;
  subscriptionAmount: number;
  subscriptionDuration: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  status: string;
  dbName?: string;
  customerId?: string;
  paymentId?: string;
}

export const customerService = {
  // Get all customers
  getAllCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await api.get('/customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get customer by ID
  getCustomerById: async (id: string): Promise<Customer> => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  // Create new customer
  createCustomer: async (customerData: Omit<Customer, 'id'>): Promise<Customer> => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id: string, customerData: Partial<Customer>): Promise<Customer> => {
    try {
      const response = await api.put(`/customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  // Delete customer
  deleteCustomer: async (id: string): Promise<void> => {
    try {
      await api.delete(`/customers/${id}`);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },

  // Block/Unblock customer
  toggleCustomerStatus: async (id: string, blocked: boolean): Promise<Customer> => {
    try {
      const response = await api.patch(`/customers/${id}/toggle-block`, { status: blocked ? 'blocked' : 'active' });
      return response.data;
    } catch (error) {
      console.error('Error updating customer status:', error);
      throw error;
    }
  }
};

export default customerService;