'use client';

import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface RouteData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  waypoints: { lat: number; lng: number }[];
  name: string;
  distance: number;
  duration: number;
}

function createIcon(color: string, label: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 32px; height: 32px;
      background: ${color}; border: 3px solid white;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 800; color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">${label}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

const startIcon = createIcon('#0D7F57', 'A');
const endIcon = createIcon('#D93636', 'B');

export default function RouteMap({ route }: { route: RouteData }) {
  // Build the full path: start -> waypoints -> end
  const points: [number, number][] = [
    [route.startLat, route.startLng],
    ...route.waypoints.map((wp): [number, number] => [wp.lat, wp.lng]),
    [route.endLat, route.endLng],
  ];

  // Center on the midpoint
  const centerLat = (route.startLat + route.endLat) / 2;
  const centerLng = (route.startLng + route.endLng) / 2;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Route line */}
      <Polyline
        positions={points}
        pathOptions={{
          color: '#3352F5',
          weight: 5,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
          dashArray: undefined,
        }}
      />

      {/* Route line shadow */}
      <Polyline
        positions={points}
        pathOptions={{
          color: '#00000020',
          weight: 8,
          opacity: 1,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />

      {/* Start marker */}
      <Marker position={[route.startLat, route.startLng]} icon={startIcon}>
        <Popup>
          <div className="font-body text-sm">
            <strong>Punto de salida</strong>
          </div>
        </Popup>
      </Marker>

      {/* End marker */}
      <Marker position={[route.endLat, route.endLng]} icon={endIcon}>
        <Popup>
          <div className="font-body text-sm">
            <strong>Punto de llegada</strong>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
