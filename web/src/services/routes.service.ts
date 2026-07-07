import { api } from './api';
import {
  WalkRoute,
  PaginatedResponse,
  PaginationParams,
} from '@/interfaces';

// Rutas son solo lectura desde la web. Se crean unicamente desde la app movil.
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
};
