import { api } from './api';

export const favoritesService = {
  async getAll() {
    return api.get('/favorites');
  },

  async addBusiness(businessId: string) {
    return api.post(`/favorites/business/${businessId}`);
  },

  async addEvent(eventId: string) {
    return api.post(`/favorites/event/${eventId}`);
  },

  async addRoute(routeId: string) {
    return api.post(`/favorites/route/${routeId}`);
  },

  async remove(id: string) {
    return api.delete(`/favorites/${id}`);
  },
};
