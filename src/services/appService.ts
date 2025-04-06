import api from './api';

export interface App {
  id?: number;
  appName: string;
  description: string;
  implementationState: string;
  deploymentStatus: string;
  status: string;
}

const appService = {
  getAllApps: async (): Promise<App[]> => {
    const response = await api.get('/apps');
    return response.data;
  },

  getAppById: async (id: number): Promise<App> => {
    const response = await api.get(`/apps/${id}`);
    return response.data;
  },

  createApp: async (appData: Omit<App, 'id'>): Promise<App> => {
    const response = await api.post('/apps', appData);
    return response.data;
  },

  updateApp: async (id: number, appData: Partial<App>): Promise<App> => {
    const response = await api.put(`/apps/${id}`, appData);
    return response.data;
  },

  deleteApp: async (id: number): Promise<void> => {
    await api.delete(`/apps/${id}`);
  },
};

export default appService;