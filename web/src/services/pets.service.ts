import { api } from './api';
import { Pet, CreatePetPayload } from '@/interfaces';

export const petsService = {
  async getMyPets(): Promise<Pet[]> {
    return api.get<Pet[]>('/pets');
  },

  async getById(id: string): Promise<Pet> {
    return api.get<Pet>(`/pets/${id}`);
  },

  async create(payload: CreatePetPayload): Promise<Pet> {
    return api.post<Pet>('/pets', payload);
  },

  async update(id: string, payload: Partial<CreatePetPayload>): Promise<Pet> {
    return api.patch<Pet>(`/pets/${id}`, payload);
  },

  async remove(id: string): Promise<void> {
    return api.delete(`/pets/${id}`);
  },
};
