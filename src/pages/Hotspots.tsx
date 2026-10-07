import React, { useState, useEffect } from 'react';
import { useDataset } from '../context/DatasetContext';
import { HotspotLocation } from '../types';
import { InteractiveHotspotMap } from '../components/hotspots/InteractiveHotspotMap';
import { HotspotDetailDrawer } from '../components/hotspots/HotspotDetailDrawer';
import { RiskBadge, SeverityBadge } from '../components/ui/Badge';
import { MapPin, Flame, Navigation, Crosshair } from 'lucide-react';

export const Hotspots: React.FC = () => {
  const { hotspots: allHotspots, datasetInfo } = useDataset();
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotLocation | null>(() => allHotspots[0] || null);

  useEffect(() => {
    if (allHotspots.length > 0 && (!selectedHotspot || !allHotspots.some(h => h.id === selectedHotspot.id))) {
      setSelectedHotspot(allHotspots[0]);
    }
  }, [allHotspots]);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Geospatial Data Mining
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            High-Risk Accident Hotspots
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Explore spatial accident clusters, intersection vulnerability indices, and density heat zones mined from historical municipal logs.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: {datasetInfo.isSample ? 'Academic Demo Data' : datasetInfo.fileName} ({allHotspots.length} Clusters)</span>
        </div>
      </div>

      {/* Map + Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Map (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <InteractiveHotspotMap
            hotspots={allHotspots}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={(spot) => setSelectedHotspot(spot)}
          />

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0a1124]/80 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 flex items-center justify-between shadow-sm">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-cyan-500" />
              <span>Click any marker to inspect localized risk profile and casualty counts.</span>
            </span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              10 Monitored Junctions
            </span>
          </div>
        </div>

        {/* Selected Junction Details Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <HotspotDetailDrawer
            hotspot={selectedHotspot}
            onClose={() => setSelectedHotspot(null)}
          />

          {/* Quick Hotspot Directory List */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-4 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80 text-xs font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Hotspot Directory</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Ranked by risk</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2 max-h-[300px] overflow-y-auto pr-1">
              {allHotspots
                .slice()
                .sort((a, b) => b.averageRiskScore - a.averageRiskScore)
                .map((spot, idx) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    className={`w-full text-left py-2.5 px-2 rounded-xl flex items-center justify-between transition-colors ${
                      selectedHotspot?.id === spot.id
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                        : 'hover:bg-slate-50 dark:hover:bg-[#0e172e]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 font-mono w-4">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">
                          {spot.location.split('(')[0].trim()}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {spot.accidentCount} accidents
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                        {spot.averageRiskScore}
                      </span>
                      <RiskBadge level={spot.riskLevel} size="sm" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
