import React, { useState } from 'react';
import { HotspotLocation, RiskLevel } from '../../types';
import { RiskBadge } from '../ui/Badge';
import { MapPin, Navigation, Compass, Layers, ShieldAlert } from 'lucide-react';

interface InteractiveHotspotMapProps {
  hotspots: HotspotLocation[];
  selectedHotspot: HotspotLocation | null;
  onSelectHotspot: (hotspot: HotspotLocation) => void;
}

export const InteractiveHotspotMap: React.FC<InteractiveHotspotMapProps> = ({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredHotspots = hotspots.filter((h) => {
    if (filterLevel === 'ALL') return true;
    return h.riskLevel === filterLevel;
  });

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-[#060a14] dark:bg-[#070c18] overflow-hidden shadow-2xl aspect-[16/10] min-h-[480px] flex flex-col justify-between">
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto bg-[#0a1124]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800/80 shadow-lg flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '30s' }} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Spatial Risk Heatmap Grid
            </h4>
            <p className="text-[10px] text-slate-400">
              Interactive Geo-Spatial Corridor Nodes
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="pointer-events-auto bg-[#0a1124]/90 backdrop-blur-md p-1 rounded-xl border border-slate-800/80 shadow-lg flex items-center gap-1 text-xs">
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterLevel === lvl
                  ? lvl === 'HIGH'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : lvl === 'MEDIUM'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                    : lvl === 'LOW'
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl === 'ALL' ? 'All (10)' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Map: Simulated GIS road grid, waterways, highway nodes, radar sweep */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
          <defs>
            {/* Grid Pattern */}
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="0.8" />
            </pattern>

            {/* Radial Gradient for high risk glow */}
            <radialGradient id="highRiskHeat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#ef4444" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="mediumRiskHeat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background & Grid */}
          <rect width="1000" height="600" fill="#080e1a" />
          <rect width="1000" height="600" fill="url(#mapGrid)" />

          {/* Waterway / Coastal curve */}
          <path
            d="M 680 0 Q 720 180 820 320 T 960 600 L 1000 600 L 1000 0 Z"
            fill="rgba(6, 182, 212, 0.04)"
            stroke="rgba(6, 182, 212, 0.15)"
            strokeWidth="1.5"
          />

          {/* Major National Highway Arterials */}
          {/* Arterial 1: North-South Golden Quadrilateral Corridor */}
          <path
            d="M 380 40 L 410 180 L 460 320 L 520 480 L 530 580"
            fill="none"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="4"
          />
          <path
            d="M 380 40 L 410 180 L 460 320 L 520 480 L 530 580"
            fill="none"
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* Arterial 2: East-West Corridor */}
          <path
            d="M 60 280 Q 280 260 520 330 T 920 350"
            fill="none"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="3.5"
          />
          <path
            d="M 60 280 Q 280 260 520 330 T 920 350"
            fill="none"
            stroke="rgba(168, 85, 247, 0.4)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />

          {/* Arterial 3: Coastal Bypass */}
          <path
            d="M 520 330 L 680 270 L 760 180"
            fill="none"
            stroke="rgba(148, 163, 184, 0.25)"
            strokeWidth="2.5"
          />

          {/* Secondary Ring Roads / Expressways */}
          <circle cx="420" cy="300" r="140" fill="none" stroke="rgba(100, 116, 139, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="550" cy="350" r="110" fill="none" stroke="rgba(100, 116, 139, 0.2)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Heat Zone Overlays based on hotspot coordinates */}
          {filteredHotspots.map((h) => {
            const cx = (h.xPercent / 100) * 1000;
            const cy = (h.yPercent / 100) * 600;
            const isHigh = h.riskLevel === 'HIGH';
            const isMed = h.riskLevel === 'MEDIUM';

            if (!isHigh && !isMed) return null;

            return (
              <circle
                key={`heat-${h.id}`}
                cx={cx}
                cy={cy}
                r={isHigh ? 90 : 65}
                fill={isHigh ? 'url(#highRiskHeat)' : 'url(#mediumRiskHeat)'}
                className="animate-pulse-slow"
              />
            );
          })}
        </svg>
      </div>

      {/* Interactive Markers HTML Layer */}
      <div className="absolute inset-0 z-10">
        {filteredHotspots.map((spot) => {
          const isSelected = selectedHotspot?.id === spot.id;
          const isHigh = spot.riskLevel === 'HIGH';
          const isMed = spot.riskLevel === 'MEDIUM';

          const markerColor = isHigh
            ? 'bg-rose-500 text-white shadow-rose-500/50'
            : isMed
            ? 'bg-amber-500 text-white shadow-amber-500/50'
            : 'bg-emerald-500 text-white shadow-emerald-500/50';

          const pulseRingColor = isHigh
            ? 'border-rose-500 bg-rose-500/20'
            : isMed
            ? 'border-amber-500 bg-amber-500/20'
            : 'border-emerald-500 bg-emerald-500/20';

          return (
            <div
              key={spot.id}
              style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              onClick={() => onSelectHotspot(spot)}
            >
              {/* Animated pulse ring for high risk */}
              <div
                className={`absolute -inset-3 rounded-full border ${pulseRingColor} animate-ping pointer-events-none opacity-40`}
              />

              {/* Marker Button */}
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white transition-all duration-300 transform group-hover:scale-125 ${markerColor} ${
                  isSelected ? 'scale-125 ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''
                }`}
              >
                <MapPin className="w-4 h-4 fill-current" />
              </div>

              {/* Marker Label tooltip on hover or when selected */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-950/95 border border-slate-700 text-white text-[10px] font-bold shadow-xl transition-all pointer-events-none ${
                  isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                }`}
              >
                <span>{spot.location.split('(')[0].trim()}</span>
                <span className="text-slate-400 ml-1">({spot.averageRiskScore}/100)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Legend Overlay at Bottom */}
      <div className="absolute bottom-4 left-4 z-20 bg-[#0a1124]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800/80 shadow-lg flex items-center gap-4 text-[11px] text-slate-300">
        <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
          Risk Zones:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
          <span>High (≥70)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
          <span>Medium (35-69)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span>Low (0-34)</span>
        </div>
      </div>
    </div>
  );
};
