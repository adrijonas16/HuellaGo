import { api } from './api';
import {
  HuellaEvent,
  CreateEventPayload,
  PaginatedResponse,
  PaginationParams,
} from '@/interfaces';

export const eventsService = {
  async getAll(
    params?: PaginationParams & { city?: string },
  ): Promise<PaginatedResponse<HuellaEvent>> {
    const query: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) query[key] = String(value);
      });
    }
    return api.get<PaginatedResponse<HuellaEvent>>('/events', query);
  },

  async getById(id: string): Promise<HuellaEvent> {
    return api.get<HuellaEvent>(`/events/${id}`);
  },

  async create(payload: CreateEventPayload): Promise<HuellaEvent> {
    return api.post<HuellaEvent>('/events', payload);
  },

  async update(
    id: string,
    payload: Partial<CreateEventPayload>,
  ): Promise<HuellaEvent> {
    return api.patch<HuellaEvent>(`/events/${id}`, payload);
  },

  async attend(eventId: string, petId: string): Promise<void> {
    await api.post(`/events/${eventId}/attend`, { petId });
  },

  async cancelAttendance(eventId: string, petId: string): Promise<void> {
    await api.delete(`/events/${eventId}/attend`);
  },

  async remove(id: string): Promise<void> {
    return api.delete(`/events/${id}`);
  },
};
