import React, { useState } from 'react';
import { Database, Table, ArrowRight, Layers, HelpCircle } from 'lucide-react';

export const StarSchemaDiagram: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>('FACT_ACCIDENT');

  const dimensions = [
    {
      name: 'DIM_TIME',
      pk: 'time_id (PK)',
      attrs: ['date (Date)', 'day_of_week (Varchar)', 'month (Int)', 'quarter (Int)', 'time_of_day (Varchar)', 'is_weekend (Boolean)'],
      color: 'border-blue-500/40 text-blue-500 bg-blue-500/5',
      pos: 'Top-Left',
    },
    {
      name: 'DIM_LOCATION',
      pk: 'location_id (PK)',
      attrs: ['city_name (Varchar)', 'junction_name (Varchar)', 'latitude (Decimal)', 'longitude (Decimal)', 'corridor_type (Varchar)', 'jurisdiction (Varchar)'],
      color: 'border-emerald-500/40 text-emerald-500 bg-emerald-500/5',
      pos: 'Top-Right',
    },
    {
      name: 'DIM_WEATHER',
      pk: 'weather_id (PK)',
      attrs: ['weather_condition (Varchar)', 'precipitation_mm (Float)', 'visibility_meters (Int)', 'wind_speed_kmh (Float)', 'temperature_c (Float)'],
      color: 'border-cyan-500/40 text-cyan-500 bg-cyan-500/5',
      pos: 'Middle-Left',
    },
    {
      name: 'DIM_ROAD',
      pk: 'road_id (PK)',
      attrs: ['surface_condition (Varchar)', 'road_classification (Varchar)', 'speed_limit (Int)', 'lane_count (Int)', 'median_present (Boolean)'],
      color: 'border-amber-500/40 text-amber-500 bg-amber-500/5',
      pos: 'Bottom-Left',
    },
    {
      name: 'DIM_TRAFFIC',
      pk: 'traffic_id (PK)',
      attrs: ['density_tier (Varchar)', 'average_flow_rate (Int)', 'light_condition (Varchar)', 'congestion_index (Float)'],
      color: 'border-purple-500/40 text-purple-500 bg-purple-500/5',
      pos: 'Bottom-Right',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-6 shadow-lg shadow-black/20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Data Warehouse Star Schema Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dimensional data model designed for OLAP aggregation, slicing, and drill-down queries
          </p>
        </div>

        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
          DMDW Star Schema
        </span>
      </div>

      {/* Visual Star Schema Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
        {/* Left Dimensions */}
        <div className="space-y-4">
          {dimensions.slice(0, 3).map((dim) => (
            <div
              key={dim.name}
              onClick={() => setSelectedTable(dim.name)}
              className={`cursor-pointer p-4 rounded-xl border transition-all text-xs ${dim.color} ${
                selectedTable === dim.name ? 'ring-2 ring-cyan-500 scale-[1.02] shadow-md shadow-cyan-500/10' : 'hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-1.5">
                <span className="font-mono">{dim.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Dimension
                </span>
              </div>
              <div className="font-mono text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
                🔑 {dim.pk}
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                {dim.attrs.slice(0, 3).map((a, i) => (
                  <div key={i}>• {a}</div>
                ))}
                {dim.attrs.length > 3 && <div className="text-slate-400 italic">+{dim.attrs.length - 3} more...</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Center: FACT TABLE */}
        <div
          onClick={() => setSelectedTable('FACT_ACCIDENT')}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all bg-gradient-to-b from-cyan-500/15 via-[#0c162e] to-[#0a1124] dark:from-cyan-950/40 dark:via-[#0c162e] dark:to-[#0a1124] border-cyan-500/60 shadow-xl shadow-cyan-500/10 ${
            selectedTable === 'FACT_ACCIDENT' ? 'ring-4 ring-cyan-400/40' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950">
              Central Fact Table
            </span>
            <Table className="w-5 h-5 text-cyan-400" />
          </div>

          <h4 className="text-lg font-mono font-extrabold text-slate-900 dark:text-white">
            FACT_ACCIDENT
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Grain: One record per verified accident event
          </p>

          <div className="mt-4 pt-3 border-t border-cyan-500/20 text-xs space-y-2">
            <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              Foreign Keys (FK)
            </div>
            <div className="font-mono text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div>🔗 time_id (FK → DIM_TIME)</div>
              <div>🔗 location_id (FK → DIM_LOCATION)</div>
              <div>🔗 weather_id (FK → DIM_WEATHER)</div>
              <div>🔗 road_id (FK → DIM_ROAD)</div>
              <div>🔗 traffic_id (FK → DIM_TRAFFIC)</div>
            </div>

            <div className="pt-2 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              Additive Measures
            </div>
            <div className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 space-y-1">
              <div>📊 accident_count: 1</div>
              <div>📊 vehicle_count: Int</div>
              <div>📊 casualties_count: Int</div>
              <div>📊 severity_score: Decimal</div>
              <div>📊 risk_score: Decimal (0–100)</div>
            </div>
          </div>
        </div>

        {/* Right Dimensions */}
        <div className="space-y-4">
          {dimensions.slice(3).map((dim) => (
            <div
              key={dim.name}
              onClick={() => setSelectedTable(dim.name)}
              className={`cursor-pointer p-4 rounded-xl border transition-all text-xs ${dim.color} ${
                selectedTable === dim.name ? 'ring-2 ring-cyan-500 scale-[1.02] shadow-md shadow-cyan-500/10' : 'hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-1.5">
                <span className="font-mono">{dim.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Dimension
                </span>
              </div>
              <div className="font-mono text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
                🔑 {dim.pk}
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                {dim.attrs.slice(0, 3).map((a, i) => (
                  <div key={i}>• {a}</div>
                ))}
                {dim.attrs.length > 3 && <div className="text-slate-400 italic">+{dim.attrs.length - 3} more...</div>}
              </div>
            </div>
          ))}

          {/* OLAP Operations Explanatory Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Supported OLAP Operations
            </h5>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <li>• <strong>Roll-up:</strong> Daily incidents aggregated to Monthly/Annual</li>
              <li>• <strong>Drill-down:</strong> City total drilled into specific junctions</li>
              <li>• <strong>Slice:</strong> Filter WHERE weather_condition = 'Rain'</li>
              <li>• <strong>Dice:</strong> 2D cube: (Rain + Fog) × (Night) × (Highway)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
