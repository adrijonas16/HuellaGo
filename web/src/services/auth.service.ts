import { api } from './api';
import { AuthResponse, LoginPayload, RegisterPayload } from '@/interfaces';

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>('/auth/register', payload);
    this.saveTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>('/auth/login', payload);
    this.saveTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async refresh(): Promise<{ accessToken: string; refreshToken: string }> {
    const data = await api.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
    );
    this.saveTokens(data.accessToken, data.refreshToken);
    return data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};
