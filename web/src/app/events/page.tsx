'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EventCard } from '@/components/cards';
import { Chip } from '@/components/ui';
import { eventsService } from '@/services';
import { HuellaEvent } from '@/interfaces';

export default function EventsPage() {
  const [events, setEvents] = useState<HuellaEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'all'>('upcoming');

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      try {
        const response = await eventsService.getAll({ page: 1, limit: 20 });
        setEvents(response.data);
      } catch {
        // handle error
      } finally {
        setIsLoading(false);
      }
    }
    loadEvents();
  }, [activeTab]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading font-bold text-3xl text-dark">
              Eventos Pet Friendly
            </h1>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Chip
              active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
            >
              Proximos
            </Chip>
            <Chip
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            >
              Todos
            </Chip>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-72 rounded-card" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-2">
                No hay eventos cerca aun.
              </p>
              <p className="text-gray-400">
                Se el primero en crear uno.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
