import { ImageResponse } from 'next/og';
import { Paw } from '@/components/og/og-card';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#3352F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paw size={120} />
      </div>
    ),
    size,
  );
}
