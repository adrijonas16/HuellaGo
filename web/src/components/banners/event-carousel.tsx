'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { MOCK_EVENTS, ENERGY_COLORS, ENERGY_LABELS } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

const SLIDES = [
  ...MOCK_EVENTS.slice(0, 4).map((e) => ({
    type: 'event' as const,
    id: e.id,
    title: e.title,
    subtitle: `${formatDateShort(e.date)} · ${e.meetingPoint}`,
    badge: e.isFree ? '🆓 Gratis' : `S/ ${e.price}`,
    attendees: e._count.attendances,
    link: `/events/${e.id}`,
    color: ENERGY_COLORS[e.energyLevel || 'MEDIUM'],
    emoji: e.energyLevel === 'HIGH' ? '🏃' : e.energyLevel === 'LOW' ? '🐕' : '🚶',
  })),
  {
    type: 'ad' as const,
    id: 'ad1',
    title: '20% OFF en vacunación',
    subtitle: 'Veterinaria Patitas Felices · Por tiempo limitado',
    badge: '🏷️ Promo',
    attendees: 0,
    link: '/directory/1',
    color: '#FFC531',
    emoji: '🏥',
  },
];

export function EventCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative overflow-hidden rounded-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href={slide.link}>
        <div
          className="p-5 md:p-6 transition-all duration-500 min-h-[120px] flex items-center"
          style={{ background: `linear-gradient(135deg, ${slide.color}20, ${slide.color}08)` }}
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="text-4xl md:text-5xl opacity-40 animate-float shrink-0">{slide.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 backdrop-blur-sm" style={{ color: slide.color }}>
                  {slide.badge}
                </span>
                {slide.type === 'event' && slide.attendees > 0 && (
                  <span className="text-[10px] text-bark/60 flex items-center gap-0.5">
                    <Users size={10} /> {slide.attendees}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-dark text-base md:text-lg truncate">{slide.title}</h3>
              <p className="text-xs text-bark truncate mt-0.5">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <button onClick={() => setCurrent((current - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center shadow-sm hover:bg-white boop-btn">
        <ChevronLeft size={14} className="text-bark" />
      </button>
      <button onClick={() => setCurrent((current + 1) % SLIDES.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center shadow-sm hover:bg-white boop-btn">
        <ChevronRight size={14} className="text-bark" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-primary' : 'w-1.5 bg-bark/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
