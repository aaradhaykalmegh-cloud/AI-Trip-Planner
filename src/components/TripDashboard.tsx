import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Sparkles,
  Share2,
  Printer,
  Bookmark,
  MessageSquareText,
  DollarSign,
  Luggage,
  Compass,
  Map as MapIcon,
  Check,
  CheckCircle,
  Copy,
  Users
} from 'lucide-react';
import { TripPlan, ActivityItem, CustomExpense, PackingItem } from '../types';
import { ItineraryView } from './ItineraryView';
import { InteractiveMap } from './InteractiveMap';
import { BudgetView } from './BudgetView';
import { PackingView } from './PackingView';
import { LocalGuideView } from './LocalGuideView';
import { AIChatDrawer } from './AIChatDrawer';
import { SwapActivityModal } from './SwapActivityModal';

interface TripDashboardProps {
  trip: TripPlan;
  onSaveTrip: (trip: TripPlan) => void;
  isSaved: boolean;
  onUpdateTrip: (updated: TripPlan) => void;
  onBackToPlanner: () => void;
}

type TabType = 'itinerary' | 'map' | 'budget' | 'packing' | 'guide';

export const TripDashboard: React.FC<TripDashboardProps> = ({
  trip,
  onSaveTrip,
  isSaved,
  onUpdateTrip,
  onBackToPlanner,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [swapModalState, setSwapModalState] = useState<{
    isOpen: boolean;
    dayNumber: number;
    activity: ActivityItem | null;
  }>({
    isOpen: false,
    dayNumber: 1,
    activity: null,
  });

  const [customExpenses, setCustomExpenses] = useState<CustomExpense[]>(() => {
    try {
      const saved = localStorage.getItem(`expenses-${trip.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copyFeedback, setCopyFeedback] = useState(false);

  // Toggle activity completion
  const handleToggleActivity = (dayNumber: number, activityId: string) => {
    const updatedDays = trip.days.map(d => {
      if (d.dayNumber !== dayNumber) return d;
      return {
        ...d,
        activities: d.activities.map(a =>
          a.id === activityId ? { ...a, completed: !a.completed } : a
        ),
      };
    });
    onUpdateTrip({ ...trip, days: updatedDays });
  };

  // Swap activity replacement
  const handleConfirmSwap = (
    dayNumber: number,
    oldActivityId: string,
    newActivity: ActivityItem
  ) => {
    const updatedDays = trip.days.map(d => {
      if (d.dayNumber !== dayNumber) return d;
      return {
        ...d,
        activities: d.activities.map(a =>
          a.id === oldActivityId ? newActivity : a
        ),
      };
    });
    onUpdateTrip({ ...trip, days: updatedDays });
  };

  // Packing list interactions
  const handleTogglePacking = (itemId: string) => {
    const updatedList = trip.packingList.map(p =>
      p.id === itemId ? { ...p, packed: !p.packed } : p
    );
    onUpdateTrip({ ...trip, packingList: updatedList });
  };

  const handleAddPackingItem = (item: Omit<PackingItem, 'id'>) => {
    const newItem: PackingItem = {
      ...item,
      id: `custom-p-${Date.now()}`,
    };
    onUpdateTrip({ ...trip, packingList: [newItem, ...trip.packingList] });
  };

  const handleDeletePackingItem = (itemId: string) => {
    const updatedList = trip.packingList.filter(p => p.id !== itemId);
    onUpdateTrip({ ...trip, packingList: updatedList });
  };

  const handleSetAllPacked = (packed: boolean) => {
    const updatedList = trip.packingList.map(p => ({ ...p, packed }));
    onUpdateTrip({ ...trip, packingList: updatedList });
  };

  // Custom expense tracker interactions
  const handleAddExpense = (expense: Omit<CustomExpense, 'id'>) => {
    const newExp: CustomExpense = {
      ...expense,
      id: `exp-${Date.now()}`,
    };
    const next = [newExp, ...customExpenses];
    setCustomExpenses(next);
    localStorage.setItem(`expenses-${trip.id}`, JSON.stringify(next));
  };

  const handleDeleteExpense = (id: string) => {
    const next = customExpenses.filter(e => e.id !== id);
    setCustomExpenses(next);
    localStorage.setItem(`expenses-${trip.id}`, JSON.stringify(next));
  };

  // Share summary
  const handleShare = () => {
    const text = `✈️ My AI Trip to ${trip.overview.destination} (${trip.days.length} Days)!\nEst. Budget: ${trip.budget.currency} ${trip.budget.totalEstimatedCost}\n${trip.overview.summary}`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Metadata badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 border border-indigo-400/40 text-indigo-200">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              {trip.overview.country}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-slate-200">
              <Calendar className="w-3.5 h-3.5" />
              {trip.days.length} Days Itinerary
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-slate-200 capitalize">
              <Users className="w-3.5 h-3.5" />
              {trip.request.groupType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
              <DollarSign className="w-3.5 h-3.5" />
              Est. {trip.budget.currency} {trip.budget.totalEstimatedCost}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 capitalize">
              {trip.request.travelStyle} Vibe
            </span>
          </div>

          {/* Heading & Tagline */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {trip.overview.destination}
            </h1>
            <p className="text-base sm:text-xl font-medium text-indigo-200 mt-2 max-w-3xl">
              "{trip.overview.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-3xl leading-relaxed">
              {trip.overview.summary}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              {/* Save Button */}
              <button
                type="button"
                id="dashboard-save-trip-btn"
                onClick={() => onSaveTrip(trip)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isSaved
                    ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Saved to Library</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Itinerary</span>
                  </>
                )}
              </button>

              {/* AI Concierge Drawer Trigger */}
              <button
                type="button"
                id="dashboard-open-chat-btn"
                onClick={() => setIsChatOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/30 transition-all"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>AI Travel Concierge</span>
              </button>

              {/* Share / Copy Button */}
              <button
                type="button"
                id="dashboard-share-btn"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Copy trip summary"
              >
                {copyFeedback ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copyFeedback ? 'Copied!' : 'Share'}</span>
              </button>

              {/* Print / Export */}
              <button
                type="button"
                id="dashboard-print-btn"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Print or save as PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
            </div>

            {/* Plan another trip link */}
            <button
              type="button"
              id="dashboard-plan-another-btn"
              onClick={onBackToPlanner}
              className="text-xs font-semibold text-indigo-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              ← Edit Trip Parameters
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'itinerary', label: 'Day-by-Day Itinerary', icon: <Calendar className="w-4 h-4" /> },
            { id: 'map', label: 'Interactive Route Map', icon: <MapIcon className="w-4 h-4" /> },
            { id: 'budget', label: 'Budget & Expenses', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'packing', label: 'Smart Packing List', icon: <Luggage className="w-4 h-4" /> },
            { id: 'guide', label: 'Local Guide & Secrets', icon: <Compass className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Tab Content */}
      <div className="pt-2">
        {activeTab === 'itinerary' && (
          <ItineraryView
            trip={trip}
            onToggleActivity={handleToggleActivity}
            onOpenSwapModal={(dayNumber, activity) =>
              setSwapModalState({ isOpen: true, dayNumber, activity })
            }
          />
        )}

        {activeTab === 'map' && <InteractiveMap trip={trip} />}

        {activeTab === 'budget' && (
          <BudgetView
            trip={trip}
            customExpenses={customExpenses}
            onAddCustomExpense={handleAddExpense}
            onDeleteCustomExpense={handleDeleteExpense}
          />
        )}

        {activeTab === 'packing' && (
          <PackingView
            destination={trip.overview.destination}
            items={trip.packingList}
            onToggleItem={handleTogglePacking}
            onAddItem={handleAddPackingItem}
            onDeleteItem={handleDeletePackingItem}
            onSetAllPacked={handleSetAllPacked}
          />
        )}

        {activeTab === 'guide' && (
          <LocalGuideView overview={trip.overview} hiddenGems={trip.hiddenGems} />
        )}
      </div>

      {/* Floating AI Concierge Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          id="floating-ai-concierge-btn"
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-full font-bold shadow-xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all group"
        >
          <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="text-sm">Ask AI Concierge</span>
        </button>
      </div>

      {/* AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        trip={trip}
      />

      {/* Activity Swap Modal */}
      <SwapActivityModal
        isOpen={swapModalState.isOpen}
        onClose={() => setSwapModalState(prev => ({ ...prev, isOpen: false }))}
        dayNumber={swapModalState.dayNumber}
        activity={swapModalState.activity}
        trip={trip}
        onConfirmSwap={handleConfirmSwap}
      />
    </div>
  );
};
