import React from 'react';
import { Link } from 'react-router-dom';
import { AccidentRecord } from '../../types';
import { RiskBadge, SeverityBadge } from '../ui/Badge';
import { ArrowUpRight } from 'lucide-react';

interface RecentAccidentsTableProps {
  records: AccidentRecord[];
  limit?: number;
}

export const RecentAccidentsTable: React.FC<RecentAccidentsTableProps> = ({
  records,
  limit = 6,
}) => {
  const displayRecords = records.slice(0, limit);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 overflow-hidden shadow-lg shadow-black/20">
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Accident Records
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Latest chronological incident logs from historical data warehouse
          </p>
        </div>
        <Link
          to="/accidents"
          className="flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline"
        >
          <span>View All {records.length}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#060b17] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Accident ID</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Weather / Road</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4 text-right">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
            {displayRecords.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  {r.id}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                  {r.location}
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  {r.date}
                </td>
                <td className="py-3 px-4">
                  <span className="text-slate-600 dark:text-slate-300">{r.weather}</span>
                  <span className="text-slate-400 mx-1">•</span>
                  <span className="text-slate-500">{r.roadCondition}</span>
                </td>
                <td className="py-3 px-4">
                  <SeverityBadge severity={r.severity} />
                </td>
                <td className="py-3 px-4 text-right">
                  <RiskBadge level={r.riskLevel} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
