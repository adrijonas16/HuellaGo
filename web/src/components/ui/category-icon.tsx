import { Stethoscope, Siren, Footprints, BedDouble, Sun, ShoppingBag, Scissors, GraduationCap, Home, MapPin, type LucideProps } from 'lucide-react';

const MAP = {
  VETERINARY: Stethoscope,
  EMERGENCY_CLINIC: Siren,
  WALKER: Footprints,
  HOTEL: BedDouble,
  DAYCARE: Sun,
  STORE: ShoppingBag,
  GROOMING: Scissors,
  TRAINER: GraduationCap,
  SHELTER: Home,
  OTHER: MapPin,
} as const;

export function CategoryIcon({ category, ...props }: { category: string } & LucideProps) {
  const Icon = MAP[category as keyof typeof MAP] ?? MapPin;
  return <Icon {...props} />;
}
