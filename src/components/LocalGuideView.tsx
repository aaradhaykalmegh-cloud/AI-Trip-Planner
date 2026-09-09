import React, { useState } from 'react';
import {
  ShieldAlert,
  Phone,
  CloudSun,
  Calendar,
  Sparkles,
  Compass,
  CreditCard,
  CheckCircle,
  Copy,
  Check,
  Gem,
  MapPin
} from 'lucide-react';
import { TripOverview, HiddenGem } from '../types';

interface LocalGuideViewProps {
  overview: TripOverview;
  hiddenGems: HiddenGem[];
}

export const LocalGuideView: React.FC<LocalGuideViewProps> = ({ overview, hiddenGems }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Weather & Season Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weather Forecast Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Expected Weather & Climate
            </h4>
            <p className="text-sm font-semibold text-slate-900 mt-1">
              {overview.weatherForecast}
            </p>
          </div>
        </div>

        {/* Best Time To Visit Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Optimal Travel Windows
            </h4>
            <p className="text-sm font-semibold text-slate-900 mt-1">
              {overview.bestTimeToVisit}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact Quick Access */}
      <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-800">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h4 className="font-bold text-sm">
            Emergency Contacts in {overview.destination}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Police', val: overview.emergencyInfo?.police || '112 / 911' },
            { label: 'Ambulance & Fire', val: overview.emergencyInfo?.ambulance || '112 / 911' },
            { label: 'Tourist / General Assistance', val: overview.emergencyInfo?.general || '112' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="text-sm font-black text-rose-700">{item.val}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.val, `em-${idx}`)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Copy number"
              >
                {copiedKey === `em-${idx}` ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Etiquette & Local Advice */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h4 className="text-base font-bold text-slate-900">
            Local Etiquette & Cultural Customs
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {overview.localEtiquette && overview.localEtiquette.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3"
            >
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transit Hacks & Currency Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transit Tips */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Transit & Getting Around
            </h4>
          </div>

          <div className="space-y-2.5">
            {overview.transitTips && overview.transitTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-sky-50/50 border border-sky-100 text-xs text-slate-700 leading-relaxed"
              >
                🚌 {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Currency & Payment Tips */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Money, Tipping & Payments
            </h4>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 leading-relaxed">
            💳 {overview.currencyTips || 'Carry both cards and a reasonable amount of local cash for small family shops, transport tickets, and market vendors.'}
          </div>
        </div>
      </div>

      {/* Curated Hidden Gems */}
      {hiddenGems && hiddenGems.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-amber-500" />
            <h4 className="text-base font-bold text-slate-900">
              Curated Hidden Gems & Secret Spots
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenGems.map((gem, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-amber-200/80 rounded-xl p-4 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">{gem.location}</span>
                </div>
                <h5 className="font-bold text-sm text-slate-900">{gem.name}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{gem.description}</p>
                <div className="pt-2 border-t border-amber-100 text-[11px] text-amber-900 font-medium">
                  ✨ <strong className="font-bold">Why Visit: </strong>
                  {gem.whyVisit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
