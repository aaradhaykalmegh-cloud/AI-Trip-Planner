import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Luggage,
  Sparkles,
  Shield,
  Shirt,
  Smartphone,
  Sparkle,
  Compass,
  CheckCheck,
  RotateCcw
} from 'lucide-react';
import { PackingItem } from '../types';

interface PackingViewProps {
  destination: string;
  items: PackingItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: Omit<PackingItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onSetAllPacked: (packed: boolean) => void;
}

const CATEGORY_TABS: Array<{ id: string; label: string; icon: React.ReactNode }> = [
  { id: 'all', label: 'All Items', icon: <Luggage className="w-3.5 h-3.5" /> },
  { id: 'essentials', label: 'Essentials & Docs', icon: <Shield className="w-3.5 h-3.5" /> },
  { id: 'clothing', label: 'Clothing & Footwear', icon: <Shirt className="w-3.5 h-3.5" /> },
  { id: 'electronics', label: 'Electronics & Tech', icon: <Smartphone className="w-3.5 h-3.5" /> },
  { id: 'toiletries', label: 'Toiletries & Care', icon: <Sparkle className="w-3.5 h-3.5" /> },
  { id: 'gear', label: 'Gear & Bags', icon: <Compass className="w-3.5 h-3.5" /> },
];

export const PackingView: React.FC<PackingViewProps> = ({
  destination,
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onSetAllPacked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingItem['category']>('essentials');

  const packedCount = items.filter(i => i.packed).length;
  const totalCount = items.length;
  const progressPct = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(i => i.category === selectedCategory);

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    onAddItem({
      item: newItemText.trim(),
      category: newItemCategory,
      packed: false,
      reason: 'Custom user addition',
    });

    setNewItemText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Progress */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Smart Packing List for {destination}
            </h3>
            <p className="text-xs text-slate-500">
              Curated by AI based on weather, planned sights, and local etiquette
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="packing-check-all-btn"
              onClick={() => onSetAllPacked(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Pack All</span>
            </button>
            <button
              type="button"
              id="packing-reset-all-btn"
              onClick={() => onSetAllPacked(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">
              {packedCount} of {totalCount} items packed
            </span>
            <span className={progressPct === 100 ? 'text-emerald-600' : 'text-indigo-600'}>
              {progressPct}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPct === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-sky-500'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            id={`packing-tab-${tab.id}`}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedCategory === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Add Custom Item Box */}
      <form
        onSubmit={handleAddNew}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-2.5"
      >
        <input
          type="text"
          id="custom-packing-input"
          value={newItemText}
          onChange={e => setNewItemText(e.target.value)}
          placeholder="Add custom packing item (e.g. prescription glasses, sunscreen, hiking socks)..."
          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <select
          id="custom-packing-category"
          value={newItemCategory}
          onChange={e => setNewItemCategory(e.target.value as any)}
          className="w-full sm:w-auto text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="essentials">Essentials</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="toiletries">Toiletries</option>
          <option value="gear">Gear & Bags</option>
        </select>
        <button
          type="submit"
          id="add-packing-item-btn"
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shrink-0 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Items Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map(item => (
          <div
            key={item.id}
            id={`packing-item-${item.id}`}
            onClick={() => onToggleItem(item.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              item.packed
                ? 'bg-slate-50/80 border-slate-200 opacity-75'
                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600 transition-colors"
              title={item.packed ? 'Unpack' : 'Mark packed'}
            >
              {item.packed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold leading-snug ${
                  item.packed ? 'line-through text-slate-400' : 'text-slate-900'
                }`}>
                  {item.item}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 py-0.2 bg-slate-100 rounded">
                  {item.category}
                </span>
              </div>

              {item.reason && (
                <p className="text-[11px] text-slate-500 mt-0.5 italic line-clamp-1">
                  💡 {item.reason}
                </p>
              )}
            </div>

            <button
              type="button"
              id={`delete-packing-${item.id}`}
              onClick={e => {
                e.stopPropagation();
                onDeleteItem(item.id);
              }}
              className="text-slate-300 hover:text-rose-600 transition-colors p-1"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
