import React from 'react';
import { Link } from 'react-router-dom';
import { HotspotLocation } from '../../types';
import { RiskBadge } from '../ui/Badge';
import { ArrowUpRight, Flame } from 'lucide-react';

interface TopHotspotsTableProps {
  hotspots: HotspotLocation[];
}

export const TopHotspotsTable: React.FC<TopHotspotsTableProps> = ({ hotspots }) => {
  // Sort by averageRiskScore descending, take top 5
  const top5 = [...hotspots]
    .sort((a, b) => b.averageRiskScore - a.averageRiskScore)
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 overflow-hidden shadow-lg shadow-black/20">
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Current High-Risk Areas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked by composite historical risk score
            </p>
          </div>
        </div>

        <Link
          to="/hotspots"
          className="flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline"
        >
          <span>View Heatmap</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
        {top5.map((spot, idx) => (
          <div
            key={spot.id}
            className="p-3.5 sm:px-5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white truncate">
                  {spot.location}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{spot.accidentCount.toLocaleString()} Accidents</span>
                  <span>•</span>
                  <span>Predominant: {spot.mostCommonWeather}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono">
                  {spot.averageRiskScore}
                </span>
                <span className="text-[10px] text-slate-400">/100</span>
              </div>
              <RiskBadge level={spot.riskLevel} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
