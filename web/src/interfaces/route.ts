export type RouteDifficulty = 'EASY' | 'MODERATE' | 'HARD';

export interface Waypoint {
  lat: number;
  lng: number;
}

export interface WalkRoute {
  id: string;
  creatorId: string;
  name: string;
  description: string | null;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  waypoints: Waypoint[];
  distance: number;
  duration: number;
  difficulty: RouteDifficulty;
  city: string;
  district: string | null;
  isPublic: boolean;
  hasShade: boolean;
  hasWater: boolean;
  hasRestArea: boolean;
  timesWalked: number;
  avgRating: number;
  photos?: { id: string; url: string }[];
  _count?: { walks: number; reviews: number; favorites: number };
}

export interface CreateRoutePayload {
  name: string;
  description?: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  waypoints: Waypoint[];
  distance: number;
  duration: number;
  difficulty?: RouteDifficulty;
  city: string;
  district?: string;
  isPublic?: boolean;
  hasShade?: boolean;
  hasWater?: boolean;
  hasRestArea?: boolean;
}
