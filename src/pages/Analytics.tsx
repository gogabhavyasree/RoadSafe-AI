import React, { useState, useMemo } from 'react';
import { useDataset } from '../context/DatasetContext';
import { AnalyticsFilterState } from '../types';
import { filterAccidents } from '../utils/filters';
import {
  aggregateBySeverity,
  aggregateByWeather,
  aggregateByTime,
  aggregateByRoadCondition,
  aggregateMonthlyTrend,
  aggregateVehicleInvolvement,
  SEVERITY_COLORS,
} from '../utils/analytics';
import { AnalyticsFilterBar } from '../components/analytics/AnalyticsFilterBar';
import { ChartContainer } from '../components/analytics/ChartContainer';
import { useToast } from '../context/ToastContext';
import { BarChart3, FilterX } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const INITIAL_FILTERS: AnalyticsFilterState = {
  startDate: '',
  endDate: '',
  weather: 'ALL',
  severity: 'ALL',
  location: 'ALL',
  roadCondition: 'ALL',
  riskLevel: 'ALL',
};

export const Analytics: React.FC = () => {
  const { showToast } = useToast();
  const { records, datasetInfo } = useDataset();
  const [filters, setFilters] = useState<AnalyticsFilterState>(INITIAL_FILTERS);

  // Dynamically filter records
  const filteredRecords = useMemo(() => {
    return filterAccidents(records, filters);
  }, [records, filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast('Filters Reset', `Displaying all ${records.length} accident records.`, 'info');
  };

  // Aggregations computed strictly from filtered dataset
  const severityData = useMemo(() => aggregateBySeverity(filteredRecords), [filteredRecords]);
  const weatherData = useMemo(() => aggregateByWeather(filteredRecords), [filteredRecords]);
  const timeData = useMemo(() => aggregateByTime(filteredRecords), [filteredRecords]);
  const roadData = useMemo(() => aggregateByRoadCondition(filteredRecords), [filteredRecords]);
  const monthlyData = useMemo(() => aggregateMonthlyTrend(filteredRecords), [filteredRecords]);
  const vehicleData = useMemo(() => aggregateVehicleInvolvement(filteredRecords), [filteredRecords]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Exploratory Data Analysis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Accident Analytics & Dimensional Cubes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Explore multi-dimensional historical incident patterns across environmental, temporal, and road-related facets with interactive OLAP cross-filtering.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: {datasetInfo.isSample ? 'Academic Demo Data' : datasetInfo.fileName} ({filteredRecords.length}/{records.length})</span>
        </div>
      </div>

      {/* Filter Bar */}
      <AnalyticsFilterBar
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        filteredCount={filteredRecords.length}
        totalCount={records.length}
      />

      {/* Check for empty filtered results */}
      {filteredRecords.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-12 text-center shadow-lg shadow-black/20">
          <FilterX className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No accidents match the selected filters
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try resetting your weather, severity, or location filter criteria to expand the analytical cohort.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* 6 Responsive Analytics Charts Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chart 1: Accident Severity Distribution (Donut) */}
          <ChartContainer
            title="Chart 1: Severity Distribution"
            subtitle="Minor vs Moderate vs Severe vs Fatal"
          >
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {severityData.map((entry) => (
                    <Cell key={`sev-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: any, name: any) => [`${val} cases`, name]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(val) => <span className="text-xs text-slate-400">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Chart 2: Accidents by Weather (Bar) */}
          <ChartContainer
            title="Chart 2: Weather Breakdown"
            subtitle="Incidents grouped by atmospheric condition"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weatherData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" name="Total Accidents" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="highRiskCount" name="High Risk" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Chart 3: Accidents by Time of Day (Bar) */}
          <ChartContainer
            title="Chart 3: Diurnal Time Distribution"
            subtitle="Accident counts across day cycles"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" name="Accidents" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avgRiskScore" name="Avg Risk Score" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Chart 4: Road Condition Impact */}
          <ChartContainer
            title="Chart 4: Road Surface Hazard"
            subtitle="Pavement traction friction vs incidents"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={roadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" name="Total Accidents" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="highRiskCount" name="High Risk Cases" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Chart 5: Monthly Accident Trend (Line) */}
          <ChartContainer
            title="Chart 5: Monthly Trajectory"
            subtitle="Incident timeline across current filter"
          >
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accidents"
                  name="Incidents"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#10b981' }}
                />
                <Line
                  type="monotone"
                  dataKey="avgRisk"
                  name="Avg Risk Index"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 2, fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Chart 6: Vehicle Involvement Distribution (Bar) */}
          <ChartContainer
            title="Chart 6: Multi-Vehicle Conflicts"
            subtitle="Collision count by vehicles involved"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={vehicleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="totalCount" name="Total Accidents" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="severeCount" name="Severe / Fatal" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};
