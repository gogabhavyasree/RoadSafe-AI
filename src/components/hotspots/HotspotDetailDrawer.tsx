import React from 'react';
import { HotspotLocation } from '../../types';
import { RiskBadge, SeverityBadge } from '../ui/Badge';
import { MapPin, CloudRain, AlertTriangle, Activity, Skull, HeartPulse, X } from 'lucide-react';

interface HotspotDetailDrawerProps {
  hotspot: HotspotLocation | null;
  onClose: () => void;
}

export const HotspotDetailDrawer: React.FC<HotspotDetailDrawerProps> = ({
  hotspot,
  onClose,
}) => {
  if (!hotspot) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800/80 p-8 text-center bg-white dark:bg-[#0a1124]/50 backdrop-blur-md">
        <MapPin className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-50" />
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
          No Junction Selected
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Click any radar marker on the spatial map to inspect localized accident profile.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/90 backdrop-blur-md p-5 shadow-xl shadow-black/20 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0e172e] transition-colors"
        aria-label="Close hotspot detail"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 pr-8">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20 shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RiskBadge level={hotspot.riskLevel} size="sm" />
            <span className="text-[10px] font-mono text-slate-400">
              {hotspot.id}
            </span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            {hotspot.location}
          </h3>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Composite Risk
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white">
              {hotspot.averageRiskScore}
            </span>
            <span className="text-xs text-slate-400">/100</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Accident Volume
          </span>
          <div className="mt-1 text-xl font-mono font-extrabold text-cyan-600 dark:text-cyan-400">
            {hotspot.accidentCount.toLocaleString()}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Common Weather
          </span>
          <div className="mt-1 flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
            <CloudRain className="w-3.5 h-3.5 text-cyan-500" />
            <span>{hotspot.mostCommonWeather}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Avg Severity
          </span>
          <div className="mt-1">
            <SeverityBadge severity={hotspot.averageSeverity} size="sm" />
          </div>
        </div>
      </div>

      {/* Casualties & Primary Risk Factor */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-100/60 dark:bg-[#060b17] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-rose-500">
            <Skull className="w-4 h-4" />
            <span>
              <strong>{hotspot.fatalities}</strong> Fatalities
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            <HeartPulse className="w-4 h-4" />
            <span>
              <strong>{hotspot.injuries}</strong> Severe Injuries
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>Primary: <strong>{hotspot.primaryRiskFactor}</strong></span>
        </div>
      </div>
    </div>
  );
};
