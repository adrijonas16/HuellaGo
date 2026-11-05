'use client';

import { useState, useRef } from 'react';
import { Camera, X, Plus, Image } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';

interface PhotoUploadProps {
  maxPhotos?: number;
  label?: string;
  onPhotosChange?: (photos: string[]) => void;
}

export function PhotoUpload({ maxPhotos = 6, label = 'Subir fotos', onPhotosChange }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (photos.length >= maxPhotos) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        setPhotos((prev) => {
          const next = [...prev, url];
          onPhotosChange?.(next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      const next = prev.filter((_, i) => i !== index);
      onPhotosChange?.(next);
      return next;
    });
  }

  return (
    <div>
      {label && <label className="text-sm font-semibold text-dark block mb-2">{label}</label>}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {photos.map((photo, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
            <SafeImage src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors flex items-center justify-center">
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label={`Quitar foto ${i + 1}`}
                className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity boop-btn"
              >
                <X size={14} className="text-error" />
              </button>
            </div>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-bark/20 bg-cream hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer boop-btn"
          >
            <Camera size={20} className="text-bark/40" />
            <span className="text-[10px] text-bark/40 font-medium">
              {photos.length === 0 ? 'Subir foto' : `${photos.length}/${maxPhotos}`}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {photos.length === 0 && (
        <p className="text-[11px] text-bark/40 mt-2">Formatos: JPG, PNG. Máximo 5MB por foto.</p>
      )}
    </div>
  );
}
