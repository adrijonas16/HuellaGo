'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/interfaces';
import { authService } from '@/services';
import { ApiError } from '@/services/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** true cuando la sesión es local porque el backend no respondió */
  isDemo: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

function demoUser(email: string, firstName?: string, lastName?: string): User {
  const fromEmail = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  const first = firstName || fromEmail.split(' ')[0] || 'Amigo';
  return {
    id: 'demo-' + email,
    email,
    firstName: first.charAt(0).toUpperCase() + first.slice(1),
    lastName: lastName || '',
    avatarUrl: null,
    phone: null,
    city: 'Arequipa',
    district: 'Cayma',
    role: 'OWNER',
  };
}

/** Error de red (backend apagado) vs. error real de credenciales */
function isNetworkError(err: unknown) {
  return !(err instanceof ApiError) || err.statusCode >= 500 || err.statusCode === 404;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isDemo: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await authService.login({ email, password });
          set({ user: response.user, isAuthenticated: true, isDemo: false, isLoading: false });
        } catch (err) {
          if (isNetworkError(err)) {
            // Backend no disponible: sesión de demostración local
            set({ user: demoUser(email), isAuthenticated: true, isDemo: true, isLoading: false });
            return;
          }
          set({ isLoading: false });
          throw new Error('El email o la contraseña no coinciden');
        }
      },

      register: async (email, password, firstName, lastName) => {
        set({ isLoading: true });
        try {
          const response = await authService.register({ email, password, firstName, lastName });
          set({ user: response.user, isAuthenticated: true, isDemo: false, isLoading: false });
        } catch (err) {
          if (isNetworkError(err)) {
            set({ user: demoUser(email, firstName, lastName), isAuthenticated: true, isDemo: true, isLoading: false });
            return;
          }
          set({ isLoading: false });
          throw new Error(err instanceof Error ? err.message : 'No se pudo crear la cuenta');
        }
      },

      logout: () => {
        try {
          authService.logout();
        } catch {}
        set({ user: null, isAuthenticated: false, isDemo: false });
      },
    }),
    {
      name: 'huellago-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated, isDemo: s.isDemo }),
    },
  ),
);
