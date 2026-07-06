import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const CATEGORY_LABELS: Record<string, string> = {
  VETERINARY: 'Veterinaria',
  EMERGENCY_CLINIC: 'Clinica 24h',
  WALKER: 'Paseador',
  HOTEL: 'Hotel',
  DAYCARE: 'Guarderia',
  STORE: 'Tienda',
  GROOMING: 'Grooming',
  TRAINER: 'Entrenador',
  OTHER: 'Otro',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: 'Facil',
  MODERATE: 'Moderada',
  HARD: 'Dificil',
};

export const ENERGY_LABELS: Record<string, string> = {
  LOW: 'Tranquilo',
  MEDIUM: 'Moderado',
  HIGH: 'Energico',
};

export const SIZE_LABELS: Record<string, string> = {
  MINI: 'Mini',
  SMALL: 'Pequeno',
  MEDIUM: 'Mediano',
  LARGE: 'Grande',
  GIANT: 'Gigante',
};
