import React, { useState, useMemo } from 'react';
import { AccidentRecord } from '../../types';
import { RiskBadge, SeverityBadge } from '../ui/Badge';
import { searchAccidents, sortAccidents, SortField, SortOrder } from '../../utils/filters';
import { exportToCSV } from '../../utils/exportCsv';
import { useToast } from '../../context/ToastContext';
import {
  Search,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  Car,
} from 'lucide-react';

interface DataTableProps {
  data: AccidentRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherFilter, setWeatherFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search
  const filteredRecords = useMemo(() => {
    let result = searchAccidents(data, searchQuery);

    if (weatherFilter !== 'ALL') {
      result = result.filter((r) => r.weather === weatherFilter);
    }
    if (severityFilter !== 'ALL') {
      result = result.filter((r) => r.severity === severityFilter);
    }
    if (riskFilter !== 'ALL') {
      result = result.filter((r) => r.riskLevel === riskFilter);
    }

    return sortAccidents(result, sortField, sortOrder);
  }, [data, searchQuery, weatherFilter, severityFilter, riskFilter, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const success = exportToCSV(filteredRecords, `roadsafe-accident-data-${Date.now()}.csv`);
    if (success) {
      showToast(
        'CSV Exported Successfully',
        `Exported ${filteredRecords.length} filtered accident records to CSV.`,
        'success'
      );
    } else {
      showToast('Export Failed', 'No records matching filter to export.', 'warning');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md shadow-lg shadow-black/20 overflow-hidden space-y-4 p-4 sm:p-5">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, city, weather, or severity..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060b17] text-slate-900 dark:text-white text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50"
          />
        </div>

        {/* Quick Table Filters & CSV Export */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Weather Filter */}
          <select
            value={weatherFilter}
            onChange={(e) => {
              setWeatherFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060b17] text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Weather</option>
            <option value="Clear">Clear</option>
            <option value="Rain">Rain</option>
            <option value="Fog">Fog</option>
            <option value="Snow">Snow</option>
            <option value="Other">Other</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060b17] text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Severities</option>
            <option value="Minor">Minor</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Fatal">Fatal</option>
          </select>

          {/* Risk Level */}
          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060b17] text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Risk</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#060b17]/95 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th
                onClick={() => handleSort('id')}
                className="py-3 px-4 cursor-pointer hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Accident ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('date')}
                className="py-3 px-4 cursor-pointer hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Environment</th>
              <th className="py-3 px-4">Time</th>
              <th
                onClick={() => handleSort('severity')}
                className="py-3 px-4 cursor-pointer hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Severity</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('vehicles')}
                className="py-3 px-4 cursor-pointer hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Vehicles</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('riskScore')}
                className="py-3 px-4 cursor-pointer hover:text-cyan-400 text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Risk Score</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  <Car className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-semibold">No accidents match the selected filters.</p>
                  <p className="text-xs text-slate-500 mt-1">Try clearing your search query or loosening filter limits.</p>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#0e172e]/60 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {r.id}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                    {r.location}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700 dark:text-slate-300">{r.weather}</span>
                    <span className="text-slate-400 mx-1">•</span>
                    <span className="text-slate-500">{r.roadCondition}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {r.timeOfDay}
                  </td>
                  <td className="py-3 px-4">
                    <SeverityBadge severity={r.severity} />
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {r.vehicles} veh
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-extrabold text-slate-900 dark:text-white">
                    {r.riskScore}/100
                  </td>
                  <td className="py-3 px-4 text-right">
                    <RiskBadge level={r.riskLevel} size="sm" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060b17] text-xs font-semibold focus:outline-none focus:border-cyan-500/50"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
          <span className="ml-2">
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length}
          </span>
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-[#0e172e] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
            let pageNum = idx + 1;
            if (totalPages > 5 && currentPage > 3) {
              pageNum = currentPage - 3 + idx;
              if (pageNum > totalPages) pageNum = totalPages - (4 - idx);
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0e172e]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-[#0e172e] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
