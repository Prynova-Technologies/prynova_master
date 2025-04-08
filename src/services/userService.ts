import api from './api';

export interface User {
  id?: string;
  username: string;
  email: string;
  role: string;
  status: string;
  password?: string;
}

export const userApi = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/admins');
      return response.data.admins;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id: string) => {
    try {
      const response = await api.get(`/admins/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData: User) => {
    try {
      const response = await api.post('/admins', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id: string, userData: Partial<User>) => {
    try {
      const response = await api.put(`/admins/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id: string) => {
    try {
      const response = await api.delete(`/admins/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};