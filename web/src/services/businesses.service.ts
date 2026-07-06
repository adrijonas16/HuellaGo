import { api } from './api';
import { Business, BusinessFilters, PaginatedResponse } from '@/interfaces';

export const businessesService = {
  async getAll(
    filters?: BusinessFilters,
  ): Promise<PaginatedResponse<Business>> {
    const params: Record<string, string> = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params[key] = String(value);
      });
    }
    return api.get<PaginatedResponse<Business>>('/businesses', params);
  },

  async getById(id: string): Promise<Business> {
    return api.get<Business>(`/businesses/${id}`);
  },

  async getMine(): Promise<Business[]> {
    return api.get<Business[]>('/businesses/mine');
  },

  async create(payload: Partial<Business>): Promise<Business> {
    return api.post<Business>('/businesses', payload);
  },

  async update(id: string, payload: Partial<Business>): Promise<Business> {
    return api.patch<Business>(`/businesses/${id}`, payload);
  },

  async remove(id: string): Promise<void> {
    return api.delete(`/businesses/${id}`);
  },
};
