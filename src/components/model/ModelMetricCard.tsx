import React from 'react';
import { ModelMetric } from '../../types';
import { Trophy, Cpu, Zap, CheckCircle } from 'lucide-react';

interface ModelMetricCardProps {
  model: ModelMetric;
}

export const ModelMetricCard: React.FC<ModelMetricCardProps> = ({ model }) => {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${
        model.isBest
          ? 'bg-gradient-to-b from-cyan-500/10 via-white to-white dark:from-cyan-950/30 dark:via-[#0a1124]/90 dark:to-[#0a1124]/90 border-cyan-500/50 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-500/30'
          : 'bg-white dark:bg-[#0a1124]/80 border-slate-200 dark:border-slate-800/80 shadow-lg shadow-black/20'
      }`}
    >
      {model.isBest && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md shadow-cyan-500/20">
          <Trophy className="w-3 h-3" />
          <span>Top Demo Performer</span>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`p-2 rounded-xl ${
              model.isBest
                ? 'bg-cyan-500/20 text-cyan-500 dark:text-cyan-400'
                : 'bg-slate-100 dark:bg-[#060b17] text-slate-500 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {model.name}
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              {model.shortName} Classifier
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {model.description}
        </p>

        {/* Big Accuracy Stat */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Model Accuracy
          </span>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">
            {model.accuracy}%
          </div>
        </div>

        {/* Detailed 4-Metric Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400">Precision</span>
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {model.precision}%
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400">Recall</span>
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {model.recall}%
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400">F1-Score</span>
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {model.f1}%
            </div>
          </div>
        </div>
      </div>

      {/* Latency footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" />
          <span>Inference: {model.inferenceLatency}</span>
        </span>
        <span>Train: {model.trainingTime}</span>
      </div>
    </div>
  );
};
