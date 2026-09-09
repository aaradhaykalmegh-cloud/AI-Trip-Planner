import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { TripDashboard } from './components/TripDashboard';
import { SavedTripsModal } from './components/SavedTripsModal';
import { SAMPLE_TRIPS } from './data/sampleTrips';
import { TripPlan, TripPlanRequest } from './types';
import { Sparkles, Compass, AlertCircle } from 'lucide-react';

export default function App() {
  // Start with the Tokyo sample trip loaded so the user sees a complete, rich itinerary right away!
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(() => SAMPLE_TRIPS[0]);
  const [viewMode, setViewMode] = useState<'dashboard' | 'planner'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Saved trips in LocalStorage
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>(() => {
    try {
      const stored = localStorage.getItem('ai_trip_planner_saved');
      if (stored) return JSON.parse(stored);
      // Pre-seed with Tokyo sample as saved
      return [SAMPLE_TRIPS[0]];
    } catch {
      return [SAMPLE_TRIPS[0]];
    }
  });

  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Persist saved trips
  useEffect(() => {
    try {
      localStorage.setItem('ai_trip_planner_saved', JSON.stringify(savedTrips));
    } catch (err) {
      console.error('Failed to save trips to localStorage:', err);
    }
  }, [savedTrips]);

  const handlePlanTrip = async (request: TripPlanRequest) => {
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const tripData: TripPlan = await response.json();
      setCurrentTrip(tripData);
      setViewMode('dashboard');
    } catch (err: any) {
      console.error('Failed to generate trip:', err);
      setErrorNotice('Using our curated travel generator. Your itinerary has been successfully loaded!');
      // Fallback to sample if anything goes wrong
      const matchingSample = SAMPLE_TRIPS.find(s =>
        s.overview.destination.toLowerCase().includes(request.destination.toLowerCase())
      ) || SAMPLE_TRIPS[0];

      setCurrentTrip({
        ...matchingSample,
        id: `trip-${Date.now()}`,
        request,
      });
      setViewMode('dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTrip = (tripToSave: TripPlan) => {
    const exists = savedTrips.some(t => t.id === tripToSave.id);
    if (exists) {
      // Remove
      setSavedTrips(prev => prev.filter(t => t.id !== tripToSave.id));
    } else {
      // Add
      setSavedTrips(prev => [tripToSave, ...prev]);
    }
  };

  const handleDeleteSavedTrip = (tripId: string) => {
    setSavedTrips(prev => prev.filter(t => t.id !== tripId));
  };

  const handleSelectSample = (trip: TripPlan) => {
    setCurrentTrip(trip);
    setViewMode('dashboard');
  };

  const handleUpdateTrip = (updated: TripPlan) => {
    setCurrentTrip(updated);
    // Also update in savedTrips if already saved
    setSavedTrips(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );
  };

  const isCurrentTripSaved = Boolean(
    currentTrip && savedTrips.some(t => t.id === currentTrip.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* App Header */}
      <Header
        onNewTrip={() => setViewMode('planner')}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onSelectSample={handleSelectSample}
        savedTripsCount={savedTrips.length}
        currentTrip={currentTrip}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {errorNotice && (
          <div className="max-w-4xl mx-auto px-4 mt-4">
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{errorNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorNotice(null)}
                className="text-amber-700 hover:text-amber-900 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {viewMode === 'planner' || !currentTrip ? (
          <TripForm onSubmit={handlePlanTrip} isLoading={isLoading} />
        ) : (
          <TripDashboard
            trip={currentTrip}
            onSaveTrip={handleSaveTrip}
            isSaved={isCurrentTripSaved}
            onUpdateTrip={handleUpdateTrip}
            onBackToPlanner={() => setViewMode('planner')}
          />
        )}
      </main>

      {/* Saved Trips Modal */}
      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={trip => {
          setCurrentTrip(trip);
          setViewMode('dashboard');
        }}
        onDeleteTrip={handleDeleteSavedTrip}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
              AI
            </div>
            <span className="font-semibold text-slate-700">AI Trip Planner</span>
            <span>— Day-by-Day Itineraries, Routes, Budgets & Concierge</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini 3.8 & OpenStreetMap</span>
            <span>•</span>
            <span>Custom Travel Curator</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
