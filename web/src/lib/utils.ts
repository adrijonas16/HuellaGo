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

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MONTHS_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DAYS = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];

export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getDate()} de ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatTime(dateString: string): string {
  const d = new Date(dateString);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatDateShort(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getDate()} de ${MONTHS_LONG[d.getMonth()]}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatDateFull(dateString: string): string {
  const d = new Date(dateString);
  return `${DAYS[d.getDay()]} ${d.getDate()} de ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  VETERINARY: 'Veterinaria',
  EMERGENCY_CLINIC: 'Clínica 24h',
  WALKER: 'Paseador',
  HOTEL: 'Hotel',
  DAYCARE: 'Guardería',
  STORE: 'Tienda',
  GROOMING: 'Grooming',
  TRAINER: 'Entrenador',
  OTHER: 'Otro',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: 'Fácil',
  MODERATE: 'Moderada',
  HARD: 'Difícil',
};

export const ENERGY_LABELS: Record<string, string> = {
  LOW: 'Tranquilo',
  MEDIUM: 'Moderado',
  HIGH: 'Enérgico',
};

export const SIZE_LABELS: Record<string, string> = {
  MINI: 'Mini',
  SMALL: 'Pequeño',
  MEDIUM: 'Mediano',
  LARGE: 'Grande',
  GIANT: 'Gigante',
};
