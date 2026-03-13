import { apiClient } from '@/api/apiClient';

export const getAllTasks = () => apiClient.get('/api/tasks');
export const getTaskById = (id) => apiClient.get(`/api/tasks/${id}`);
export const createTask = (title, completed) =>
  apiClient.post('/api/tasks', { title, completed });
export const updateTask = (id, data) => apiClient.put(`/api/tasks/${id}`, data);
export const deleteTask = (id) => apiClient.delete(`/api/tasks/${id}`);
