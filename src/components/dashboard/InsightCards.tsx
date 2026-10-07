import React from 'react';
import { generateDynamicInsights } from '../../utils/analytics';
import { AccidentRecord } from '../../types';
import { AlertTriangle, CloudRain, Car, Sparkles } from 'lucide-react';

interface InsightCardsProps {
  records: AccidentRecord[];
}

export const InsightCards: React.FC<InsightCardsProps> = ({ records }) => {
  const insights = generateDynamicInsights(records);

  const iconMap: Record<string, React.ReactNode> = {
    'insight-1': <AlertTriangle className="w-4 h-4 text-amber-500" />,
    'insight-2': <CloudRain className="w-4 h-4 text-cyan-500" />,
    'insight-3': <Car className="w-4 h-4 text-rose-500" />,
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Data-Mined Safety Insights
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Generated from {records.length} records
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 shadow-lg shadow-black/20 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {item.badge}
                </span>
                {iconMap[item.id] || <Sparkles className="w-4 h-4 text-cyan-500" />}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold uppercase">
                Active Cluster
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                {item.stat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
