import React from 'react';
import { Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useDataset } from '../../context/DatasetContext';

export const PreprocessingLog: React.FC = () => {
  const { datasetInfo } = useDataset();

  return (
    <div className="rounded-2xl bg-[#091124]/70 dark:bg-[#091124]/80 border border-slate-800 p-6 overflow-hidden shadow-lg shadow-black/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Automated Preprocessing Execution Log
            </h4>
            <p className="text-xs text-slate-400">
              Heuristic normalization, star schema alignment & multi-factor imputation pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Integrity Verified</span>
          </span>
          <span className="text-xs font-mono text-slate-400">
            {datasetInfo.uploadedAt}
          </span>
        </div>
      </div>

      {/* Log items */}
      <div className="space-y-2.5 font-mono text-xs">
        {datasetInfo.preprocessingLog.map((logItem, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2.5 rounded-xl bg-[#060b17] border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-slate-300 font-sans text-xs">{logItem}</span>
              <span className="text-[10px] text-cyan-400 uppercase font-semibold shrink-0">
                [COMPLETED]
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
