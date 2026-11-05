/** Dibujo mínimo de una ruta a partir de sus waypoints reales (sin mapa externo). */
export function RouteSketch({
  waypoints,
  className = '',
  color = '#3352F5',
}: {
  waypoints: { lat: number; lng: number }[];
  className?: string;
  color?: string;
}) {
  const pts = waypoints?.length >= 2 ? waypoints : [{ lat: 0, lng: 0 }, { lat: 1, lng: 1 }];
  const lats = pts.map((p) => p.lat);
  const lngs = pts.map((p) => p.lng);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLng, maxLng] = [Math.min(...lngs), Math.max(...lngs)];
  const span = Math.max(maxLat - minLat, maxLng - minLng) || 1;
  const pad = 18;
  const size = 200 - pad * 2;
  const xy = pts.map((p) => [
    pad + ((p.lng - minLng) / span) * size + (size - ((maxLng - minLng) / span) * size) / 2,
    pad + ((maxLat - p.lat) / span) * size + (size - ((maxLat - minLat) / span) * size) / 2,
  ]);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const [sx, sy] = xy[0];
  const [ex, ey] = xy[xy.length - 1];

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path d={d} fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 8" />
      <circle cx={sx} cy={sy} r="7" fill="white" stroke={color} strokeWidth="3" />
      <circle cx={ex} cy={ey} r="8" fill={color} />
    </svg>
  );
}
