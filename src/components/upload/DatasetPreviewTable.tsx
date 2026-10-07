import React, { useState } from 'react';
import { Table, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataset } from '../../context/DatasetContext';

export const DatasetPreviewTable: React.FC = () => {
  const { records } = useDataset();
  const [displayCount, setDisplayCount] = useState<number>(8);

  const previewRecords = records.slice(0, displayCount);

  // RoadSafe AI Semantic Colors: Red for Fatal/High, Amber for Severe/Medium, Blue for Moderate, Green for Minor/Low
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Fatal':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Severe':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Moderate':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const getRiskScoreBadge = (score: number) => {
    if (score >= 70) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (score >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  return (
    <div className="rounded-2xl bg-[#091124]/70 dark:bg-[#091124]/80 border border-slate-800 p-6 overflow-hidden shadow-lg shadow-black/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Ingested Dataset Preview
            </h4>
            <p className="text-xs text-slate-400">
              Displaying first {previewRecords.length} of {records.length} records in active memory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Show:</span>
            {[5, 8, 15].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setDisplayCount(cnt)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  displayCount === cnt
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>

          <Link
            to="/accidents"
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#060b17] uppercase text-[10px] tracking-wider text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Incident ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Junction Corridor</th>
              <th className="px-4 py-3">Weather</th>
              <th className="px-4 py-3">Road Surface</th>
              <th className="px-4 py-3">Speed Limit</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3 text-right">Risk Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {previewRecords.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-cyan-400">{r.id}</td>
                <td className="px-4 py-3 text-slate-300">{r.date}</td>
                <td className="px-4 py-3 font-sans font-medium text-white max-w-[190px] truncate">
                  {r.location}
                </td>
                <td className="px-4 py-3 font-sans">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-800">
                    {r.weather}
                  </span>
                </td>
                <td className="px-4 py-3 font-sans text-slate-300">{r.roadCondition}</td>
                <td className="px-4 py-3 text-slate-300">{r.speedLimit} km/h</td>
                <td className="px-4 py-3 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(
                      r.severity
                    )}`}
                  >
                    {r.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full font-bold border ${getRiskScoreBadge(
                      r.riskScore
                    )}`}
                  >
                    {r.riskScore}/100
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
