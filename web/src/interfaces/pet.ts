export type PetSize = 'MINI' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT';
export type EnergyLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Pet {
  id: string;
  userId: string;
  name: string;
  photoUrl: string | null;
  breed: string | null;
  birthDate: string | null;
  size: PetSize | null;
  weight: number | null;
  energyLevel: EnergyLevel;
  allergies: string | null;
  _count?: {
    walks: number;
    eventAttendances: number;
  };
}

export interface CreatePetPayload {
  name: string;
  photoUrl?: string;
  breed?: string;
  birthDate?: string;
  size?: PetSize;
  weight?: number;
  energyLevel?: EnergyLevel;
  allergies?: string;
}
