import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Compass,
  Sparkles,
  Users,
  Clock,
  Heart,
  Utensils,
  Camera,
  Trees,
  Landmark,
  ShoppingBag,
  Moon,
  Footprints,
  Coffee,
  Check
} from 'lucide-react';
import { TripPlanRequest, TravelStyle, GroupType, BudgetLevel, TripPace } from '../types';

interface TripFormProps {
  onSubmit: (request: TripPlanRequest) => void;
  isLoading: boolean;
}

const POPULAR_DESTINATIONS = [
  { city: 'Tokyo, Japan', style: 'foodie', days: 5 },
  { city: 'Paris, France', style: 'cultural', days: 4 },
  { city: 'Rome, Italy', style: 'cultural', days: 5 },
  { city: 'Bali, Indonesia', style: 'relaxed', days: 6 },
  { city: 'New York City, USA', style: 'adventure', days: 4 },
  { city: 'Banff & Rockies, Canada', style: 'adventure', days: 5 },
  { city: 'Kyoto, Japan', style: 'cultural', days: 4 },
  { city: 'Barcelona, Spain', style: 'foodie', days: 4 },
  { city: 'Reykjavik, Iceland', style: 'adventure', days: 5 },
  { city: 'Bangkok, Thailand', style: 'budget', days: 5 },
];

const TRAVEL_STYLES: { id: TravelStyle; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'cultural', label: 'Cultural & Historic', icon: <Landmark className="w-5 h-5 text-amber-600" />, desc: 'Museums, monuments, heritage' },
  { id: 'foodie', label: 'Foodie & Culinary', icon: <Utensils className="w-5 h-5 text-rose-500" />, desc: 'Street food, markets, fine dining' },
  { id: 'adventure', label: 'Adventure & Nature', icon: <Trees className="w-5 h-5 text-emerald-600" />, desc: 'Hiking, viewpoints, outdoors' },
  { id: 'relaxed', label: 'Relaxed & Wellness', icon: <Coffee className="w-5 h-5 text-teal-600" />, desc: 'Cafes, slow walks, spa & views' },
  { id: 'budget', label: 'Backpacker / Budget', icon: <Footprints className="w-5 h-5 text-orange-500" />, desc: 'Affordable, hostels, transit hacks' },
  { id: 'luxury', label: 'Luxury & High-End', icon: <Sparkles className="w-5 h-5 text-purple-600" />, desc: '5-star dining, VIP experiences' },
  { id: 'family', label: 'Family-Friendly', icon: <Heart className="w-5 h-5 text-blue-500" />, desc: 'Kids activities, easy transport' },
];

const GROUP_TYPES: { id: GroupType; label: string; icon: string }[] = [
  { id: 'solo', label: 'Solo Traveler', icon: '🎒' },
  { id: 'couple', label: 'Couple / Romantic', icon: '🥂' },
  { id: 'friends', label: 'Group of Friends', icon: '🎉' },
  { id: 'family', label: 'Family with Kids', icon: '👨‍👩‍👧‍👦' },
];

const BUDGET_LEVELS: { id: BudgetLevel; label: string; sub: string; symbol: string }[] = [
  { id: 'budget', label: 'Budget-Friendly', sub: 'Hostels, street eats, metro passes', symbol: '$' },
  { id: 'moderate', label: 'Balanced / Mid-Range', sub: 'Boutique hotels, casual bistros, top sights', symbol: '$$' },
  { id: 'luxury', label: 'Luxury / Indulgent', sub: 'Fine dining, private tours, premium hotels', symbol: '$$$' },
];

const INTEREST_TAGS = [
  'Must-See Landmarks',
  'Street Food & Night Markets',
  'Art & Museums',
  'Nature & Scenic Hikes',
  'Photography Spots',
  'Hidden Local Gems',
  'Historic Architecture',
  'Nightlife & Speakeasies',
  'Local Artisans & Shopping',
  'Coffee & Bakery Crawls',
  'Coastal / Beach Relaxation',
  'Gardens & City Parks',
];

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'SGD', 'CHF'];

export const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [durationDays, setDurationDays] = useState(5);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('foodie');
  const [groupType, setGroupType] = useState<GroupType>('couple');
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>('moderate');
  const [currency, setCurrency] = useState('USD');
  const [pace, setPace] = useState<TripPace>('moderate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Must-See Landmarks',
    'Street Food & Night Markets',
    'Hidden Local Gems',
  ]);
  const [specialNotes, setSpecialNotes] = useState('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSelectPopular = (item: { city: string; style: string; days: number }) => {
    setDestination(item.city);
    setTravelStyle(item.style as TravelStyle);
    setDurationDays(item.days);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    onSubmit({
      destination: destination.trim(),
      origin: origin.trim() || undefined,
      durationDays,
      travelStyle,
      groupType,
      budgetLevel,
      currency,
      pace,
      interests: selectedInterests,
      specialNotes: specialNotes.trim() || undefined,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Intro hero banner */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          Powered by Gemini 3.8 AI Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Where would you like to travel next?
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Tell us your dream destination and travel vibe. Our AI builds day-by-day schedules, route maps, budget breakdowns, and insider packing lists in seconds.
        </p>
      </div>

      {/* Main planner card */}
      <form
        id="trip-planner-form"
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 sm:p-8 space-y-8"
      >
        {/* Section 1: Destination & Origin */}
        <div>
          <label htmlFor="destination-input" className="block text-sm font-bold text-slate-800 mb-2">
            Where are you going? <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-5 h-5 text-indigo-500" />
            </div>
            <input
              type="text"
              id="destination-input"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="e.g. Tokyo, Paris, Rome, Bali, New York, Banff..."
              required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base"
            />
          </div>

          {/* Popular Destination Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Trending:</span>
            {POPULAR_DESTINATIONS.map(item => (
              <button
                key={item.city}
                type="button"
                id={`popular-dest-${item.city.split(',')[0].toLowerCase()}`}
                onClick={() => handleSelectPopular(item)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  destination.toLowerCase().includes(item.city.split(',')[0].toLowerCase())
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.city.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Duration, Group & Pace Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
          {/* Duration in Days */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
              <span>Trip Duration</span>
              <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md text-xs">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="duration-dec-btn"
                onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg transition-colors"
              >
                -
              </button>
              <input
                type="range"
                min="1"
                max="14"
                value={durationDays}
                onChange={e => setDurationDays(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <button
                type="button"
                id="duration-inc-btn"
                onClick={() => setDurationDays(Math.min(14, durationDays + 1))}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg transition-colors"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 px-1">
              <span>Weekend (2-3d)</span>
              <span>1 Week (7d)</span>
              <span>2 Weeks (14d)</span>
            </div>
          </div>

          {/* Group Type */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Who is traveling?</label>
            <div className="grid grid-cols-2 gap-2">
              {GROUP_TYPES.map(grp => (
                <button
                  key={grp.id}
                  type="button"
                  id={`group-type-${grp.id}`}
                  onClick={() => setGroupType(grp.id)}
                  className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-all text-left ${
                    groupType === grp.id
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-1 ring-indigo-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{grp.icon}</span>
                  <span className="truncate">{grp.label.split('/')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Itinerary Pace</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'relaxed', label: 'Relaxed', desc: '1-2 spots/day' },
                { id: 'moderate', label: 'Balanced', desc: '2-3 spots/day' },
                { id: 'packed', label: 'Fast-Paced', desc: 'See everything' },
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  id={`pace-btn-${p.id}`}
                  onClick={() => setPace(p.id as TripPace)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    pace === p.id
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-1 ring-indigo-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  <div className="text-[10px] text-slate-500 truncate">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Travel Style Selection */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-2">
            Select Your Travel Style / Vibe
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {TRAVEL_STYLES.map(style => (
              <button
                key={style.id}
                type="button"
                id={`travel-style-${style.id}`}
                onClick={() => setTravelStyle(style.id)}
                className={`p-3 rounded-xl border flex items-start gap-3 transition-all text-left ${
                  travelStyle === style.id
                    ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="mt-0.5 p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                  {style.icon}
                </div>
                <div>
                  <div className={`text-xs font-bold ${travelStyle === style.id ? 'text-indigo-950' : 'text-slate-800'}`}>
                    {style.label}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    {style.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Budget & Currency */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-bold text-slate-800">
              Budget Level & Currency
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">Currency:</span>
              <select
                id="currency-select"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGET_LEVELS.map(tier => (
              <button
                key={tier.id}
                type="button"
                id={`budget-tier-${tier.id}`}
                onClick={() => setBudgetLevel(tier.id)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-left ${
                  budgetLevel === tier.id
                    ? 'bg-indigo-50/80 border-indigo-500 ring-1 ring-indigo-500 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-indigo-600 text-base shadow-xs shrink-0">
                  {tier.symbol}
                </div>
                <div>
                  <div className={`text-xs font-bold ${budgetLevel === tier.id ? 'text-indigo-950' : 'text-slate-800'}`}>
                    {tier.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {tier.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 5: Interest Tags */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-2">
            Select Your Main Interests & Experiences
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  id={`interest-chip-${interest.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => toggleInterest(interest)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 6: Special Requests / Notes */}
        <div className="pt-2 border-t border-slate-100">
          <label htmlFor="special-notes-input" className="block text-sm font-bold text-slate-800 mb-1.5">
            Special Requests, Dietary Needs, or Must-See Spots <span className="text-slate-400 font-normal text-xs">(Optional)</span>
          </label>
          <textarea
            id="special-notes-input"
            rows={2}
            value={specialNotes}
            onChange={e => setSpecialNotes(e.target.value)}
            placeholder="e.g. Need vegetarian restaurant options; obsessed with ramen; prefer walking tours over tour buses; must see teamLab..."
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            id="submit-generate-plan-btn"
            disabled={isLoading || !destination.trim()}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base text-white flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-200 transition-all ${
              isLoading || !destination.trim()
                ? 'bg-slate-300 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 hover:shadow-indigo-300/60 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Designing Your Custom Itinerary with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>Generate Complete AI Trip Plan</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            Includes day-by-day timeline, interactive map pins, itemized budget, and smart packing checklist.
          </p>
        </div>
      </form>
    </div>
  );
};
