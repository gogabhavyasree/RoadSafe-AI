import React from 'react';
import { PredictionOutput } from '../../types';
import { RiskBadge } from '../ui/Badge';
import { History, RotateCcw, Trash2 } from 'lucide-react';

interface PredictionHistoryProps {
  history: PredictionOutput[];
  onRerun: (item: PredictionOutput) => void;
  onClear: () => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({
  history,
  onRerun,
  onClear,
}) => {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-400">
        <History className="w-6 h-6 mx-auto mb-2 text-slate-400 opacity-60" />
        <p>No previous prediction simulations logged in this session.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 overflow-hidden shadow-lg shadow-black/20">
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Prediction History
          </h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
            {history.length} runs
          </span>
        </div>

        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#060b17] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Conditions</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Risk Level</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
            {history.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                  {item.timestamp}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                  {item.inputs.location}
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  {item.inputs.weather} • {item.inputs.roadCondition} • {item.inputs.timeOfDay}
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  {item.riskScore}/100
                </td>
                <td className="py-3 px-4">
                  <RiskBadge level={item.riskLevel} size="sm" />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onRerun(item)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-run</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
