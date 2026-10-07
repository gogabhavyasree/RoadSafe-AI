import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SafetyRecommendationsProps {
  recommendations: string[];
}

export const SafetyRecommendations: React.FC<SafetyRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 p-5 shadow-lg shadow-black/20">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Intelligent Safety Recommendations
        </h3>
      </div>

      <div className="mt-4 space-y-2.5">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
