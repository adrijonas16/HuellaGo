export type BusinessCategory =
  | 'VETERINARY'
  | 'EMERGENCY_CLINIC'
  | 'WALKER'
  | 'HOTEL'
  | 'DAYCARE'
  | 'STORE'
  | 'GROOMING'
  | 'TRAINER'
  | 'SHELTER'
  | 'OTHER';

export type BusinessStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface Business {
  id: string;
  name: string;
  description: string | null;
  category: BusinessCategory;
  status: BusinessStatus;
  phone: string | null;
  whatsapp: string | null;
  address: string;
  city: string;
  district: string | null;
  latitude: number;
  longitude: number;
  is24Hours: boolean;
  isPetFriendly: boolean;
  isVerified: boolean;
  priceRange: string | null;
  avgRating?: number;
  photos?: { id: string; url: string }[];
  _count?: { reviews: number; favorites: number };
}

export interface BusinessFilters {
  category?: BusinessCategory;
  latitude?: number;
  longitude?: number;
  radius?: number;
  is24Hours?: boolean;
  minRating?: number;
  isVerified?: boolean;
  page?: number;
  limit?: number;
}
