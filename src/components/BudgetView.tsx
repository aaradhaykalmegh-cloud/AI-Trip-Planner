import React, { useState } from 'react';
import {
  DollarSign,
  PieChart,
  TrendingDown,
  PlusCircle,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Building,
  Utensils,
  Ticket,
  Bus,
  ShieldAlert
} from 'lucide-react';
import { TripPlan, CustomExpense } from '../types';

interface BudgetViewProps {
  trip: TripPlan;
  customExpenses: CustomExpense[];
  onAddCustomExpense: (expense: Omit<CustomExpense, 'id'>) => void;
  onDeleteCustomExpense: (id: string) => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  trip,
  customExpenses,
  onAddCustomExpense,
  onDeleteCustomExpense,
}) => {
  const { budget, days, request } = trip;
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Food & Dining');

  const totalCustomSpent = customExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget.totalEstimatedCost - totalCustomSpent;
  const isOverBudget = remainingBudget < 0;

  const categories = [
    {
      name: 'Accommodation',
      amount: budget.categories.accommodation,
      icon: <Building className="w-4 h-4 text-indigo-600" />,
      color: 'bg-indigo-600',
    },
    {
      name: 'Food & Dining',
      amount: budget.categories.foodAndDining,
      icon: <Utensils className="w-4 h-4 text-rose-600" />,
      color: 'bg-rose-500',
    },
    {
      name: 'Activities & Tours',
      amount: budget.categories.activities,
      icon: <Ticket className="w-4 h-4 text-amber-600" />,
      color: 'bg-amber-500',
    },
    {
      name: 'Local Transit',
      amount: budget.categories.localTransit,
      icon: <Bus className="w-4 h-4 text-emerald-600" />,
      color: 'bg-emerald-500',
    },
    {
      name: 'Buffer / Misc',
      amount: budget.categories.emergencyBuffer,
      icon: <ShieldAlert className="w-4 h-4 text-purple-600" />,
      color: 'bg-purple-500',
    },
  ];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;
    const val = parseFloat(newAmount);
    if (isNaN(val) || val <= 0) return;

    onAddCustomExpense({
      title: newTitle.trim(),
      amount: val,
      category: newCategory,
      date: new Date().toLocaleDateString(),
    });

    setNewTitle('');
    setNewAmount('');
  };

  return (
    <div className="space-y-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Estimated Budget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Estimated Trip
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {budget.currency} {budget.totalEstimatedCost.toLocaleString()}
            </div>
            <span className="text-xs text-slate-500">
              ~{budget.currency} {Math.round(budget.totalEstimatedCost / days.length)} / day
            </span>
          </div>
        </div>

        {/* Per Person Cost */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cost Per Person ({request.groupType})
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {budget.currency} {budget.costPerPerson.toLocaleString()}
            </div>
            <span className="text-xs text-slate-500 capitalize">
              {request.budgetLevel} travel tier
            </span>
          </div>
        </div>

        {/* Real Expense Tracker Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
            isOverBudget
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-sky-50 border-sky-200 text-sky-600'
          }`}>
            {isOverBudget ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Actual Expenses Logged
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {budget.currency} {totalCustomSpent.toLocaleString()}
            </div>
            <span className={`text-xs font-semibold ${isOverBudget ? 'text-rose-600' : 'text-slate-500'}`}>
              {isOverBudget
                ? `Over budget by ${budget.currency} ${Math.abs(remainingBudget).toLocaleString()}`
                : `${budget.currency} ${remainingBudget.toLocaleString()} remaining`}
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Categories Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Projected Expense Allocation
            </h3>
            <p className="text-xs text-slate-500">
              Estimated costs for accommodation, meals, activities, and local travel
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            {budget.currency}
          </span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100">
          {categories.map((cat, idx) => {
            const pct = Math.max(2, Math.round((cat.amount / budget.totalEstimatedCost) * 100));
            return (
              <div
                key={idx}
                className={`${cat.color} transition-all`}
                style={{ width: `${pct}%` }}
                title={`${cat.name}: ${pct}%`}
              />
            );
          })}
        </div>

        {/* Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {categories.map((cat, idx) => {
            const pct = Math.round((cat.amount / budget.totalEstimatedCost) * 100);
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs">
                    {cat.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{cat.name}</h5>
                    <span className="text-[11px] text-slate-400">{pct}% of total</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    {budget.currency} {cat.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Expense Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form to log an expense */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Log Real Travel Expense
            </h4>
            <p className="text-xs text-slate-500">
              Record actual costs incurred during booking or on the road
            </p>
          </div>

          <form onSubmit={handleAddExpense} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expense Name
              </label>
              <input
                type="text"
                id="expense-title-input"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Flight ticket, TeamLab entry, Izakaya dinner"
                required
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount ({budget.currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="expense-amount-input"
                  value={newAmount}
                  onChange={e => setNewAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  id="expense-category-select"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Accommodation">Accommodation</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Activities & Tours">Activities</option>
                  <option value="Local Transit">Transit</option>
                  <option value="Shopping & Souvenirs">Shopping</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              id="add-expense-btn"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Expense</span>
            </button>
          </form>
        </div>

        {/* Expenses List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Recorded Expenses ({customExpenses.length})
              </h4>
              <p className="text-xs text-slate-500">
                Total spent: {budget.currency} {totalCustomSpent.toLocaleString()}
              </p>
            </div>
          </div>

          {customExpenses.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
              <Wallet className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-500">
                No custom expenses logged yet. Add your booked flights, hotels, or receipts above!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {customExpenses.map(expense => (
                <div
                  key={expense.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-800">{expense.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="px-1.5 py-0.2 rounded bg-slate-200 font-medium text-slate-600">
                        {expense.category}
                      </span>
                      {expense.date && <span>{expense.date}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-sm">
                      {budget.currency} {expense.amount.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      id={`delete-expense-${expense.id}`}
                      onClick={() => onDeleteCustomExpense(expense.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Money Saving Recommendations */}
      {budget.moneySavingTips && budget.moneySavingTips.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-sm">
              Smart Money-Saving Tips for {trip.overview.destination}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {budget.moneySavingTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white/90 p-3.5 rounded-xl border border-emerald-100 shadow-xs flex items-start gap-2.5 text-xs text-slate-700"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
