import { api } from './api';
import {
  WalkRoute,
  CreateRoutePayload,
  PaginatedResponse,
  PaginationParams,
} from '@/interfaces';

export const routesService = {
  async getAll(
    params?: PaginationParams & { city?: string; difficulty?: string },
  ): Promise<PaginatedResponse<WalkRoute>> {
    const query: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) query[key] = String(value);
      });
    }
    return api.get<PaginatedResponse<WalkRoute>>('/routes', query);
  },

  async getById(id: string): Promise<WalkRoute> {
    return api.get<WalkRoute>(`/routes/${id}`);
  },

  async create(payload: CreateRoutePayload): Promise<WalkRoute> {
    return api.post<WalkRoute>('/routes', payload);
  },

  async update(
    id: string,
    payload: Partial<CreateRoutePayload>,
  ): Promise<WalkRoute> {
    return api.patch<WalkRoute>(`/routes/${id}`, payload);
  },

  async remove(id: string): Promise<void> {
    return api.delete(`/routes/${id}`);
  },
};
