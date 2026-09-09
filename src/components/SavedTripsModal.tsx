import React from 'react';
import { X, Bookmark, Calendar, DollarSign, Trash2, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { TripPlan } from '../types';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: TripPlan[];
  onSelectTrip: (trip: TripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        id="saved-trips-modal-content"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Your Saved Itineraries</h3>
              <p className="text-xs text-slate-500">
                {savedTrips.length} {savedTrips.length === 1 ? 'trip' : 'trips'} saved in your local library
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-saved-trips-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {savedTrips.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No saved itineraries yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Generate a trip and click the "Save Trip" button to store your custom itineraries here.
              </p>
            </div>
          ) : (
            savedTrips.map(trip => (
              <div
                key={trip.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {trip.overview.destination}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {trip.days.length} Days
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 capitalize">
                      {trip.request.travelStyle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {trip.overview.tagline}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span>
                      💰 Est: {trip.budget.currency} {trip.budget.totalEstimatedCost}
                    </span>
                    <span>
                      📅 Created: {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTrip(trip);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete saved trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
