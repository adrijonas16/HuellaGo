'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncFavorite } from '@/lib/backend';

/**
 * Estado local de la app (persistido en localStorage).
 * Permite que favoritos, inscripciones, comunidades y sesión funcionen
 * aunque el backend no esté disponible (modo demo).
 */

export type FavoriteKind = 'business' | 'event' | 'route' | 'pet';

export interface FavoriteMeta {
  label: string;
  href?: string;
  subtitle?: string;
  savedAt?: string;
}

export interface Toast {
  id: number;
  message: string;
  tone?: 'success' | 'info' | 'error';
  action?: { label: string; href: string };
}

export interface NewPet {
  id: string;
  name: string;
  type: string;
  icon: string;
  breed?: string;
  createdAt: string;
}

interface AppState {
  myPets: NewPet[];
  addPet: (pet: Omit<NewPet, 'id' | 'createdAt'>) => void;
  removePet: (id: string) => void;
  favorites: Record<string, FavoriteMeta | true>; // clave `${kind}:${id}`
  registrations: Record<string, { petName?: string; petId?: string; at: string }>;
  communities: Record<string, true>;
  toasts: Toast[];

  isFavorite: (kind: FavoriteKind, id: string) => boolean;
  toggleFavorite: (kind: FavoriteKind, id: string, label?: string, meta?: Omit<FavoriteMeta, 'label'>) => boolean;
  isRegistered: (eventId: string) => boolean;
  toggleRegistration: (eventId: string, petName?: string) => boolean;
  isMember: (communityId: string) => boolean;
  toggleCommunity: (communityId: string, name?: string) => boolean;

  notify: (message: string, opts?: Omit<Toast, 'id' | 'message'>) => void;
  dismissToast: (id: number) => void;
}

let toastSeq = 0;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      myPets: [],
      addPet: (pet) => {
        set({ myPets: [...get().myPets, { ...pet, id: `p-${Date.now()}`, createdAt: new Date().toISOString() }] });
        get().notify(`${pet.name} ya es parte de tu manada`, { tone: 'success' });
      },
      removePet: (id) => {
        const pet = get().myPets.find((p) => p.id === id);
        set({ myPets: get().myPets.filter((p) => p.id !== id) });
        if (pet) get().notify(`${pet.name} se quitó de tus mascotas`, { tone: 'info' });
      },
      favorites: {},
      registrations: {},
      communities: {},
      toasts: [],

      isFavorite: (kind, id) => !!get().favorites[`${kind}:${id}`],

      toggleFavorite: (kind, id, label, meta) => {
        const key = `${kind}:${id}`;
        const favorites = { ...get().favorites };
        const added = !favorites[key];
        const defaultHref = kind === 'business' ? `/directory/${id}` : kind === 'event' ? `/events/${id}` : kind === 'route' ? `/routes/${id}` : `/pets/${id}`;
        if (added) favorites[key] = { label: label ?? 'Favorito', href: defaultHref, savedAt: new Date().toISOString(), ...meta };
        else delete favorites[key];
        set({ favorites });
        if (kind !== 'pet') syncFavorite(kind, id, added);
        get().notify(
          added ? `${label ?? 'Elemento'} guardado en favoritos` : `${label ?? 'Elemento'} quitado de favoritos`,
          added ? { tone: 'success', action: { label: 'Ver favoritos', href: '/favorites' } } : { tone: 'info' },
        );
        return added;
      },

      isRegistered: (eventId) => !!get().registrations[eventId],

      toggleRegistration: (eventId, petName) => {
        const registrations = { ...get().registrations };
        const added = !registrations[eventId];
        if (added) registrations[eventId] = { petName, at: new Date().toISOString() };
        else delete registrations[eventId];
        set({ registrations });
        get().notify(
          added
            ? `Inscripción confirmada${petName ? ` con ${petName}` : ''}`
            : 'Inscripción cancelada',
          { tone: added ? 'success' : 'info' },
        );
        return added;
      },

      isMember: (communityId) => !!get().communities[communityId],

      toggleCommunity: (communityId, name) => {
        const communities = { ...get().communities };
        const added = !communities[communityId];
        if (added) communities[communityId] = true;
        else delete communities[communityId];
        set({ communities });
        get().notify(added ? `Te uniste a ${name ?? 'la comunidad'}` : `Saliste de ${name ?? 'la comunidad'}`, {
          tone: added ? 'success' : 'info',
        });
        return added;
      },

      notify: (message, opts) => {
        const id = ++toastSeq;
        set({ toasts: [...get().toasts.slice(-2), { id, message, ...opts }] });
        setTimeout(() => get().dismissToast(id), 4200);
      },

      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: 'huellago-app',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ myPets: s.myPets, favorites: s.favorites, registrations: s.registrations, communities: s.communities }),
    },
  ),
);

/** Evita desajustes de hidratación: devuelve false hasta montar en el cliente. */
export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
