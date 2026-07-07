'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/mock-data';
import 'leaflet/dist/leaflet.css';

type Business = {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  avgRating: number;
  is24Hours: boolean;
  isVerified: boolean;
  [key: string]: any;
};

function createMarkerIcon(category: string, isSelected: boolean) {
  const color = CATEGORY_COLORS[category] || '#A0AEC0';
  const size = isSelected ? 44 : 36;
  const emoji = CATEGORY_ICONS[category] || '📍';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isSelected ? 20 : 16}px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        transition: all 0.2s;
        ${isSelected ? 'transform: scale(1.15); box-shadow: 0 0 0 4px ' + color + '40, 0 4px 12px rgba(0,0,0,0.3);' : ''}
        cursor: pointer;
      ">${emoji}</div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyToSelected({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 16, { duration: 0.8 });
  }, [lat, lng, map]);
  return null;
}

interface MapViewProps {
  businesses: Business[];
  onMarkerClick: (biz: Business) => void;
  selectedId?: string;
}

export default function MapView({ businesses, onMarkerClick, selectedId }: MapViewProps) {
  // Center on Arequipa
  const center: [number, number] = [-16.4000, -71.5370];

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {businesses.map((biz) => (
        <Marker
          key={biz.id}
          position={[biz.latitude, biz.longitude]}
          icon={createMarkerIcon(biz.category, selectedId === biz.id)}
          eventHandlers={{
            click: () => onMarkerClick(biz),
          }}
        >
          <Popup>
            <div className="font-body text-sm">
              <strong>{biz.name}</strong>
              <br />
              {biz.address}
            </div>
          </Popup>
        </Marker>
      ))}

      {selectedId && (() => {
        const sel = businesses.find((b) => b.id === selectedId);
        return sel ? <FlyToSelected lat={sel.latitude} lng={sel.longitude} /> : null;
      })()}
    </MapContainer>
  );
}
