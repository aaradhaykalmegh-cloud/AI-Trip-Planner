import React, { useState, useEffect } from 'react';
import { X, ArrowRightLeft, Sparkles, Loader2, Check, Clock, DollarSign } from 'lucide-react';
import { ActivityItem, TripPlan } from '../types';

interface SwapActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  activity: ActivityItem | null;
  trip: TripPlan;
  onConfirmSwap: (dayNumber: number, oldActivityId: string, newActivity: ActivityItem) => void;
}

export const SwapActivityModal: React.FC<SwapActivityModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  activity,
  trip,
  onConfirmSwap,
}) => {
  const [reason, setReason] = useState('indoor');
  const [isLoading, setIsLoading] = useState(false);
  const [alternatives, setAlternatives] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && activity) {
      loadAlternatives();
    }
  }, [isOpen, activity]);

  if (!isOpen || !activity) return null;

  const loadAlternatives = async (chosenReason = reason) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/suggest-alternatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: trip.overview.destination,
          currentActivity: activity.name,
          timeBlock: activity.timeBlock,
          category: activity.category,
          currency: trip.budget.currency,
          reason: chosenReason,
        }),
      });
      const data = await res.json();
      setAlternatives(data.alternatives || []);
    } catch (err) {
      console.error('Failed to get alternatives:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAlternative = (alt: any) => {
    const updated: ActivityItem = {
      ...activity,
      name: alt.name,
      description: alt.description,
      estimatedCost: typeof alt.estimatedCost === 'number' ? alt.estimatedCost : activity.estimatedCost,
      estimatedDuration: alt.estimatedDuration || activity.estimatedDuration,
      insiderTip: alt.insiderTip || 'Recommended alternative spot.',
      category: alt.category || activity.category,
    };

    onConfirmSwap(dayNumber, activity.id, updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        id="swap-activity-modal-content"
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Swap Activity on Day {dayNumber}
              </h3>
              <p className="text-xs text-slate-500">
                Current: <span className="font-semibold text-slate-700">{activity.name}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reason Filter */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            What kind of alternative are you looking for?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {[
              { id: 'indoor', label: 'Rainy / Indoor' },
              { id: 'relaxed', label: 'More Relaxed' },
              { id: 'foodie', label: 'Cafe / Culinary' },
              { id: 'budget', label: 'Free / Budget' },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setReason(r.id);
                  loadAlternatives(r.id);
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  reason === r.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alternatives List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
              <p className="text-xs font-medium">Generating bespoke options in {trip.overview.destination}...</p>
            </div>
          ) : alternatives.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No alternatives found. Try selecting a different preference above.
            </div>
          ) : (
            alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {alt.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {alt.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    {alt.estimatedCost === 0 ? 'Free' : `~${trip.budget.currency} ${alt.estimatedCost}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {alt.estimatedDuration || '2 hours'}
                  </span>
                </div>

                {alt.insiderTip && (
                  <div className="text-[11px] text-indigo-900 bg-indigo-50/80 p-2 rounded-lg border border-indigo-100">
                    ✨ <strong className="font-semibold">Tip: </strong>
                    {alt.insiderTip}
                  </div>
                )}

                <button
                  type="button"
                  id={`confirm-alt-btn-${idx}`}
                  onClick={() => handleSelectAlternative(alt)}
                  className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-bold bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-indigo-200 group-hover:border-indigo-600 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Choose This Alternative</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
