import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE } from '@/components/og/og-card';

export const alt = 'HuellaGo · Cada paseo deja huella';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(<OgCard title="Cada paseo deja huella" />, size);
}
