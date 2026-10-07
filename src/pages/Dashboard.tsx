import React, { useMemo } from 'react';
import { useDataset } from '../context/DatasetContext';
import {
  calculateDashboardKPIs,
  aggregateByRiskLevel,
  aggregateMonthlyTrend,
} from '../utils/analytics';
import { StatCard } from '../components/ui/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentAccidentsTable } from '../components/dashboard/RecentAccidentsTable';
import { TopHotspotsTable } from '../components/dashboard/TopHotspotsTable';
import { InsightCards } from '../components/dashboard/InsightCards';
import {
  Car,
  AlertTriangle,
  MapPin,
  Activity,
  Layers,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { records, hotspots, datasetInfo } = useDataset();
  const kpis = useMemo(() => calculateDashboardKPIs(records), [records]);
  const riskDistribution = useMemo(() => aggregateByRiskLevel(records), [records]);
  const monthlyTrend = useMemo(() => aggregateMonthlyTrend(records), [records]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Command Center
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-semibold">Active Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Road Safety Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Real-time-style analysis of historical accident patterns and model-based risk estimates across multi-dimensional warehouse dimensions.
          </p>
        </div>
        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: {datasetInfo.isSample ? 'Academic Demo Data' : datasetInfo.fileName} ({records.length} records)</span>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Accidents Analyzed"
          value={kpis.totalAccidents.toLocaleString()}
          subtitle="Pre-loaded historical logs"
          icon={Car}
          badge="Warehouse"
          trend={{ value: '+12% YoY baseline', isNeutral: true }}
          accentColor="blue"
        />
        <StatCard
          title="High Risk Incidents"
          value={kpis.highRiskCases.toLocaleString()}
          subtitle={`${kpis.highRiskRate}% of total incidents`}
          icon={AlertTriangle}
          badge="Critical"
          trend={{ value: `${kpis.fatalCases} Fatalities logged`, isPositive: false }}
          accentColor="red"
        />
        <StatCard
          title="Locations Monitored"
          value={kpis.locationsMonitored}
          subtitle="Major urban/highway junctions"
          icon={MapPin}
          badge="Active Nodes"
          trend={{ value: '10 High-traffic cities', isPositive: true }}
          accentColor="cyan"
        />
        <StatCard
          title="Average Risk Score"
          value={`${kpis.averageRiskScore}/100`}
          subtitle="Composite safety index"
          icon={Activity}
          badge="Mean Index"
          trend={{ value: 'Deterministic Model', isNeutral: true }}
          accentColor="amber"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Data Mining Insights from Dataset */}
      <InsightCards records={records} />

      {/* Charts Row: Risk Distribution Donut & Monthly Trend Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart: Risk Distribution */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Risk Level Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Classification breakdown across records
              </p>
            </div>
            <Layers className="w-4 h-4 text-cyan-500" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a1124',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: any, name: any) => [`${value} incidents`, name]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-slate-400">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Low: {riskDistribution[0].percentage}%</span>
            <span>Medium: {riskDistribution[1].percentage}%</span>
            <span>High: {riskDistribution[2].percentage}%</span>
          </div>
        </div>

        {/* Line / Area Chart: 12-Month Accident Trend */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                12-Month Historical Accident Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly incident occurrences vs high-risk severity spikes
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Full Year 2024</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accidentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="highRiskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="accidents"
                  name="Total Incidents"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#accidentGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="highRisk"
                  name="High Risk Cases"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#highRiskGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Peak Incident Months: Monsoon (Jun–Aug)</span>
            <span>High Risk Correlation: Extreme Weather</span>
          </div>
        </div>
      </div>

      {/* Bottom Tables: Recent Accidents and Current Top Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAccidentsTable records={records} limit={5} />
        <TopHotspotsTable hotspots={hotspots} />
      </div>
    </div>
  );
};
