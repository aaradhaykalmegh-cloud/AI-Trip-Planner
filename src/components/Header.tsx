import React from 'react';
import { Compass, Bookmark, PlusCircle, Sparkles, MapPin } from 'lucide-react';
import { SAMPLE_TRIPS } from '../data/sampleTrips';
import { TripPlan } from '../types';

interface HeaderProps {
  onNewTrip: () => void;
  onOpenSaved: () => void;
  onSelectSample: (trip: TripPlan) => void;
  savedTripsCount: number;
  currentTrip?: TripPlan | null;
}

export const Header: React.FC<HeaderProps> = ({
  onNewTrip,
  onOpenSaved,
  onSelectSample,
  savedTripsCount,
  currentTrip,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div
          id="app-brand-button"
          onClick={onNewTrip}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">AI Trip Planner</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Personalized Itineraries & Local Travel Guide</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sample quick selector */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="px-2 font-medium text-slate-500">Quick Samples:</span>
            {SAMPLE_TRIPS.map(trip => (
              <button
                key={trip.id}
                id={`sample-trip-${trip.id}`}
                onClick={() => onSelectSample(trip)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentTrip?.id === trip.id
                    ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {trip.overview.destination}
              </button>
            ))}
          </div>

          {/* Saved Trips button */}
          <button
            id="open-saved-trips-btn"
            onClick={onOpenSaved}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="View saved itineraries"
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Saved Trips</span>
            {savedTripsCount > 0 && (
              <span className="px-1.5 py-0.2 text-xs font-bold bg-indigo-600 text-white rounded-full">
                {savedTripsCount}
              </span>
            )}
          </button>

          {/* New Trip Plan Button */}
          <button
            id="header-new-trip-btn"
            onClick={onNewTrip}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all hover:shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
};
