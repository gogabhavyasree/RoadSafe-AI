import React from 'react';
import { AnalyticsFilterState } from '../../types';
import { DEMO_LOCATIONS } from '../../data/accidentData';
import { Filter, RotateCcw, Search } from 'lucide-react';

interface AnalyticsFilterBarProps {
  filters: AnalyticsFilterState;
  onChange: (filters: AnalyticsFilterState) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}

export const AnalyticsFilterBar: React.FC<AnalyticsFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  filteredCount,
  totalCount,
}) => {
  const activeCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'startDate' || key === 'endDate') return Boolean(val);
    return val !== 'ALL';
  }).length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 p-4 sm:p-5 shadow-lg shadow-black/20 space-y-4">
      {/* Top row: Status & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Multi-Dimensional Analytics Filters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter warehouse data across environmental, temporal, and spatial vectors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Showing <strong className="text-cyan-600 dark:text-cyan-400">{filteredCount}</strong> of {totalCount} records
          </div>

          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset ({activeCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter controls grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        {/* Weather */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Weather
          </label>
          <select
            value={filters.weather}
            onChange={(e) => onChange({ ...filters, weather: e.target.value })}
            className="w-full py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ALL">All Weather</option>
            <option value="Clear">Clear</option>
            <option value="Rain">Rain</option>
            <option value="Fog">Fog</option>
            <option value="Snow">Snow</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Severity
          </label>
          <select
            value={filters.severity}
            onChange={(e) => onChange({ ...filters, severity: e.target.value })}
            className="w-full py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ALL">All Severities</option>
            <option value="Minor">Minor</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Fatal">Fatal</option>
          </select>
        </div>

        {/* Road Surface */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Road Surface
          </label>
          <select
            value={filters.roadCondition}
            onChange={(e) => onChange({ ...filters, roadCondition: e.target.value })}
            className="w-full py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ALL">All Surfaces</option>
            <option value="Dry">Dry</option>
            <option value="Wet">Wet</option>
            <option value="Snow/Ice">Snow/Ice</option>
            <option value="Flood">Flood</option>
          </select>
        </div>

        {/* Risk Level */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Risk Level
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) => onChange({ ...filters, riskLevel: e.target.value })}
            className="w-full py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low (0-34)</option>
            <option value="MEDIUM">Medium (35-69)</option>
            <option value="HIGH">High (70-100)</option>
          </select>
        </div>

        {/* Location */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Corridor / City
          </label>
          <select
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="w-full py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ALL">All Monitored Cities</option>
            {DEMO_LOCATIONS.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
