import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-500 dark:text-amber-400 font-medium ${className}`}
      >
        <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
        <span>
          <strong>Academic Prototype:</strong> Risk scores and metrics are simulated/model-based demo estimates.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-3.5 sm:p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-500/10 border border-amber-500/25 shadow-sm text-slate-800 dark:text-slate-200 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              Academic Demonstration Prototype
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Dataset: Academic Demo Data
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30">
              DEMO / SAMPLE DATA
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Important Notice:</strong> Demo Model — Risk scores are simulated/model-based estimates for academic demonstration and are not certified predictions. Never use for actual emergency road safety decisions or scientific certifications.
          </p>
        </div>
      </div>
    </div>
  );
};
