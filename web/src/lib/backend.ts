'use client';

import { api } from '@/services/api';
import { useAuth } from '@/hooks/use-auth';

/**
 * Puente con la API real. Solo actúa cuando hay una sesión real
 * (no en modo demo). Si algo falla, devuelve el error para mostrarlo
 * sin romper la interfaz.
 */

export function hasRealSession() {
  const { isAuthenticated, isDemo } = useAuth.getState();
  return isAuthenticated && !isDemo && typeof window !== 'undefined' && !!localStorage.getItem('accessToken');
}

export function errorMessage(err: unknown, fallback = 'Algo salió mal. Inténtalo otra vez.') {
  const msg = (err as any)?.message;
  if (Array.isArray(msg)) return msg.join('. ');
  return typeof msg === 'string' && msg ? msg : fallback;
}

export type FavKind = 'business' | 'event' | 'route';

const FIELD: Record<FavKind, string> = { business: 'businessId', event: 'eventId', route: 'routeId' };

export async function syncFavorite(kind: FavKind, id: string, added: boolean) {
  if (!hasRealSession()) return;
  try {
    if (added) {
      await api.post(`/favorites/${kind}/${id}`);
    } else {
      const list = await api.get<any[]>('/favorites');
      const fav = (Array.isArray(list) ? list : []).find((f) => f[FIELD[kind]] === id);
      if (fav) await api.delete(`/favorites/${fav.id}`);
    }
  } catch {
    // los favoritos también quedan guardados en el dispositivo
  }
}

export interface ApiPet {
  id: string;
  name: string;
  petType: string;
  breed?: string | null;
  photoUrl?: string | null;
  size?: string | null;
  energyLevel?: string | null;
}

export async function getMyPets(): Promise<ApiPet[]> {
  const res = await api.get<ApiPet[] | { data: ApiPet[] }>('/pets');
  return Array.isArray(res) ? res : res?.data ?? [];
}

export async function createPet(input: { name: string; petType: string; breed?: string }) {
  return api.post<ApiPet>('/pets', input);
}

export async function deletePet(id: string) {
  return api.delete(`/pets/${id}`);
}

export async function attendEvent(eventId: string, petId: string) {
  return api.post(`/events/${eventId}/attend`, { petId });
}

export async function cancelAttendance(eventId: string, petId: string) {
  return api.request(`/events/${eventId}/attend`, { method: 'DELETE', body: JSON.stringify({ petId }) });
}

export async function createReview(input: { businessId?: string; routeId?: string; rating: number; comment: string }) {
  return api.post('/reviews', input);
}

/** Los IDs reales son UUID; los de los datos de ejemplo no. */
export const isApiId = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(id);
