import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Circle,
  Lightbulb,
  Utensils,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Tag,
  DollarSign
} from 'lucide-react';
import { TripPlan, DayItinerary, ActivityItem } from '../types';

interface ItineraryViewProps {
  trip: TripPlan;
  onToggleActivity: (dayNumber: number, activityId: string) => void;
  onOpenSwapModal: (dayNumber: number, activity: ActivityItem) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  sightseeing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  food: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  culture: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  nature: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  adventure: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  shopping: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  relaxation: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
};

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  trip,
  onToggleActivity,
  onOpenSwapModal,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | 'all'>('all');
  const [collapsedDays, setCollapsedDays] = useState<Record<number, boolean>>({});

  const toggleDayCollapse = (dayNum: number) => {
    setCollapsedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const displayedDays =
    selectedDayNumber === 'all'
      ? trip.days
      : trip.days.filter(d => d.dayNumber === selectedDayNumber);

  return (
    <div className="space-y-6">
      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          id="itinerary-filter-all"
          onClick={() => setSelectedDayNumber('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            selectedDayNumber === 'all'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Days ({trip.days.length})
        </button>
        {trip.days.map(day => (
          <button
            key={day.dayNumber}
            type="button"
            id={`itinerary-filter-day-${day.dayNumber}`}
            onClick={() => setSelectedDayNumber(day.dayNumber)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedDayNumber === day.dayNumber
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Day {day.dayNumber}</span>
            <span className={`text-[11px] font-normal px-1.5 py-0.2 rounded-md ${
              selectedDayNumber === day.dayNumber ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
            }`}>
              {day.activities.length} spots
            </span>
          </button>
        ))}
      </div>

      {/* Days List */}
      <div className="space-y-8">
        {displayedDays.map(day => {
          const isCollapsed = collapsedDays[day.dayNumber];
          const completedCount = day.activities.filter(a => a.completed).length;

          return (
            <div
              key={day.dayNumber}
              id={`itinerary-day-section-${day.dayNumber}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-xs font-bold text-indigo-200 tracking-wide uppercase">
                      Day {day.dayNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Est. Daily Budget: ~{trip.budget.currency} {day.dailyBudgetEstimate}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    {day.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200/90 mt-0.5">
                    {day.theme}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400">Progress</div>
                    <div className="text-xs font-bold text-indigo-300">
                      {completedCount} of {day.activities.length} visited
                    </div>
                  </div>
                  <button
                    type="button"
                    id={`toggle-collapse-day-${day.dayNumber}`}
                    onClick={() => toggleDayCollapse(day.dayNumber)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isCollapsed ? 'Expand Day' : 'Collapse Day'}
                  >
                    {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Day Body */}
              {!isCollapsed && (
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Daily Tip Alert if available */}
                  {day.dailyTip && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-amber-950">Daily Insider Tip: </strong>
                        {day.dailyTip}
                      </span>
                    </div>
                  )}

                  {/* Activities Timeline */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Schedule & Activities
                    </h4>

                    <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-100 space-y-6">
                      {day.activities.map((activity, idx) => {
                        const catStyle = CATEGORY_COLORS[activity.category] || CATEGORY_COLORS.sightseeing;

                        return (
                          <div
                            key={activity.id}
                            id={`activity-card-${activity.id}`}
                            className={`relative group bg-slate-50 hover:bg-white border rounded-xl p-4 sm:p-5 transition-all shadow-xs hover:shadow-md ${
                              activity.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                            }`}
                          >
                            {/* Dot on Timeline */}
                            <div className="absolute -left-[31px] sm:-left-[39px] top-5 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-xs" />

                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                {/* Completion Checkbox */}
                                <button
                                  type="button"
                                  id={`toggle-activity-${activity.id}`}
                                  onClick={() => onToggleActivity(day.dayNumber, activity.id)}
                                  className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                                  title={activity.completed ? 'Mark unvisited' : 'Mark visited'}
                                >
                                  {activity.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  ) : (
                                    <Circle className="w-5 h-5" />
                                  )}
                                </button>

                                <div>
                                  {/* Badges row */}
                                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                                      {activity.timeBlock} • {activity.startTime || 'Flexible'}
                                    </span>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                                      {activity.category}
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-slate-400" />
                                      {activity.estimatedDuration}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-700">
                                      {activity.estimatedCost === 0 ? 'Free' : `~${trip.budget.currency} ${activity.estimatedCost}`}
                                    </span>
                                  </div>

                                  {/* Activity Name */}
                                  <h5 className={`text-base font-bold tracking-tight ${
                                    activity.completed ? 'line-through text-slate-400' : 'text-slate-900'
                                  }`}>
                                    {activity.name}
                                  </h5>

                                  {/* Description */}
                                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                                    {activity.description}
                                  </p>

                                  {/* Location */}
                                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                    <span className="truncate">{activity.location}</span>
                                    <a
                                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name + ' ' + trip.overview.destination)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-indigo-600 hover:underline font-medium text-[11px] ml-1"
                                    >
                                      Maps
                                    </a>
                                  </div>

                                  {/* Insider Tip if available */}
                                  {activity.insiderTip && (
                                    <div className="mt-3 p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-start gap-2 text-xs text-indigo-950">
                                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                                      <span>
                                        <strong className="font-semibold text-indigo-900">Pro Tip: </strong>
                                        {activity.insiderTip}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Swap activity button */}
                              <div className="shrink-0 self-end sm:self-start">
                                <button
                                  type="button"
                                  id={`swap-act-btn-${activity.id}`}
                                  onClick={() => onOpenSwapModal(day.dayNumber, activity)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 transition-colors"
                                  title="Replace with an AI suggested alternative"
                                >
                                  <ArrowRightLeft className="w-3.5 h-3.5" />
                                  <span>Swap Spot</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dining Recommendations for the Day */}
                  {day.dining && day.dining.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-rose-500" />
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Curated Dining Highlights
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {day.dining.map((spot, dIdx) => (
                          <div
                            key={dIdx}
                            className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 hover:bg-white hover:border-slate-300 transition-all"
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 px-2 py-0.5 bg-rose-50 rounded-md border border-rose-100">
                                {spot.mealType}
                              </span>
                              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {spot.priceRange}
                              </span>
                            </div>
                            <h6 className="text-sm font-bold text-slate-900 truncate">
                              {spot.name}
                            </h6>
                            <p className="text-xs text-slate-500 font-medium">{spot.cuisine}</p>
                            <div className="text-xs text-slate-700 mt-2 bg-white p-2 rounded-lg border border-slate-100">
                              <span className="font-semibold text-rose-600">Must Try: </span>
                              {spot.highlightDish}
                            </div>
                            {spot.notes && (
                              <p className="text-[11px] text-slate-500 mt-1.5 italic">
                                {spot.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
