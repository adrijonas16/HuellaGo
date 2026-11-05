'use client';

import { useState, useCallback } from 'react';
import { MapPin, Crosshair, Loader2 } from 'lucide-react';

interface LocationPickerProps {
  label?: string;
  value?: { lat: number; lng: number; address?: string };
  onChange: (location: { lat: number; lng: number; address?: string }) => void;
  placeholder?: string;
}

export function LocationPicker({ label, value, onChange, placeholder = 'Selecciona una ubicación' }: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalizacion');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange({ lat: latitude, lng: longitude, address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Permiso de ubicación denegado. Activa la ubicación en tu navegador.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError('Ubicación no disponible. Intenta de nuevo.');
        } else {
          setError('No se pudo obtener tu ubicación.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, [onChange]);

  return (
    <div>
      {label && <label className="text-sm font-semibold text-dark block mb-1.5">{label}</label>}

      <div className="space-y-2">
        {/* Current value display */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-button border-[1.5px] border-sand bg-white">
          <MapPin size={16} className={value ? 'text-primary' : 'text-bark/40'} />
          <span className={`text-sm flex-1 ${value ? 'text-dark' : 'text-bark/40'}`}>
            {value?.address || placeholder}
          </span>
          {value && (
            <span className="text-[10px] text-bark bg-sand px-2 py-0.5 rounded-full">
              {value.lat.toFixed(4)}, {value.lng.toFixed(4)}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold text-sm py-2.5 rounded-button hover:bg-primary/20 transition-all boop-btn disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Crosshair size={14} />
            )}
            {loading ? 'Obteniendo...' : 'Usar mi ubicación actual'}
          </button>
        </div>

        {/* Map preview */}
        {value && (
          <div className="h-40 bg-sand rounded-xl relative overflow-hidden border border-bark/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto shadow-button marker-pulse">
                  <MapPin size={16} className="text-white" />
                </div>
                <p className="text-[10px] text-bark mt-2 font-medium">
                  {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
                </p>
              </div>
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-bark/50">
              Puedes ajustar la ubicación en el mapa de la app
            </p>
          </div>
        )}

        {error && (
          <p className="text-xs text-error flex items-center gap-1">
            <span>⚠️</span> {error}
          </p>
        )}
      </div>
    </div>
  );
}
