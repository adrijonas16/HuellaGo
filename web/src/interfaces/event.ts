import { EnergyLevel, PetSize } from './pet';

export type EventStatus = 'UPCOMING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';

export interface HuellaEvent {
  id: string;
  title: string;
  description: string | null;
  date: string;
  endDate: string | null;
  meetingPoint: string;
  meetingLat: number;
  meetingLng: number;
  endPoint: string | null;
  endLat: number | null;
  endLng: number | null;
  city: string;
  district: string | null;
  maxAttendees: number | null;
  price: number;
  isFree: boolean;
  isPublic: boolean;
  energyLevel: EnergyLevel | null;
  recommendedSize: PetSize[];
  requirements: string[];
  status: EventStatus;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  route?: { id: string; name: string } | null;
  _count?: { attendances: number; reviews: number };
  photos?: { id: string; url: string }[];
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  date: string;
  endDate?: string;
  meetingPoint: string;
  meetingLat: number;
  meetingLng: number;
  endPoint?: string;
  endLat?: number;
  endLng?: number;
  city: string;
  district?: string;
  maxAttendees?: number;
  price?: number;
  isFree?: boolean;
  isPublic?: boolean;
  energyLevel?: EnergyLevel;
  recommendedSize?: PetSize[];
  requirements?: string[];
  routeId?: string;
}
