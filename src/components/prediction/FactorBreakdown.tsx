import React from 'react';
import { ContributingFactor } from '../../types';
import { AlertCircle, Layers } from 'lucide-react';

interface FactorBreakdownProps {
  factors: ContributingFactor[];
  totalScore: number;
}

export const FactorBreakdown: React.FC<FactorBreakdownProps> = ({ factors, totalScore }) => {
  const categoryBadgeColors = {
    Environment: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    Roadway: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Traffic: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Vehicle: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-5 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Model Explainability (XAI)
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Why was this score generated?
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {factors.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {item.factor}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${categoryBadgeColors[item.category]}`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="text-xs font-mono font-extrabold text-rose-500 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/20">
                +{item.impact} pts
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          Base Urban Hazard Baseline: +15 pts
        </span>
        <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
          <span>Net Composite Index:</span>
          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold text-sm">
            {totalScore}/100
          </span>
        </div>
      </div>
    </div>
  );
};
