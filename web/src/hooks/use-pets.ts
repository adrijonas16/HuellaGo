'use client';

import { useState, useCallback } from 'react';
import { Pet, CreatePetPayload } from '@/interfaces';
import { petsService } from '@/services';

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await petsService.getMyPets();
      setPets(data);
    } catch {
      setError('Error al cargar mascotas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPet = useCallback(async (payload: CreatePetPayload) => {
    setIsLoading(true);
    try {
      const pet = await petsService.create(payload);
      setPets((prev) => [...prev, pet]);
      return pet;
    } catch {
      setError('Error al registrar mascota');
      throw new Error('Error al registrar mascota');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { pets, isLoading, error, fetchPets, createPet };
}
