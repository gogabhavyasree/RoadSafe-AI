import React from 'react';

export const ConfusionMatrix: React.FC = () => {
  // Realistic matrix for Demo SVM Classifier (N = 1,000 test cases)
  const matrixData = [
    { actual: 'Low Risk', predLow: 382, predMed: 24, predHigh: 4, total: 410 },
    { actual: 'Medium Risk', predLow: 21, predMed: 356, predHigh: 18, total: 395 },
    { actual: 'High Risk', predLow: 3, predMed: 16, predHigh: 176, total: 195 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-5 shadow-lg shadow-black/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Confusion Matrix (SVM Model)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cross-tabulation of Actual ground-truth vs Predicted risk classifications (N = 1,000)
          </p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
          Sample Validation Set
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-center text-xs">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th colSpan={3} className="p-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-700">
                Predicted Class
              </th>
              <th className="p-2"></th>
            </tr>
            <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-2 text-left w-32">Actual Class</th>
              <th className="p-2">Low Risk</th>
              <th className="p-2">Medium Risk</th>
              <th className="p-2">High Risk</th>
              <th className="p-2 text-slate-400">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {matrixData.map((row, idx) => (
              <tr key={idx}>
                <td className="p-3 text-left font-bold text-slate-800 dark:text-slate-200">
                  {row.actual}
                </td>
                {/* Low cell */}
                <td className="p-3">
                  <div
                    className={`py-2 px-3 rounded-xl font-mono font-bold ${
                      idx === 0
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-extrabold text-sm'
                        : 'text-slate-400 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    {row.predLow}
                  </div>
                </td>
                {/* Med cell */}
                <td className="p-3">
                  <div
                    className={`py-2 px-3 rounded-xl font-mono font-bold ${
                      idx === 1
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-extrabold text-sm'
                        : 'text-slate-400 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    {row.predMed}
                  </div>
                </td>
                {/* High cell */}
                <td className="p-3">
                  <div
                    className={`py-2 px-3 rounded-xl font-mono font-bold ${
                      idx === 2
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-extrabold text-sm'
                        : 'text-slate-400 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    {row.predHigh}
                  </div>
                </td>
                <td className="p-3 font-mono font-bold text-slate-500">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/50" />
          <span>Diagonal = Correctly Classified (914 / 1,000 = 91.4%)</span>
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Macro F1: 91.1%
        </span>
      </div>
    </div>
  );
};
