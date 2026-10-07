import React from 'react';
import { RiskLevel } from '../../types';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  confidence?: number;
  size?: number;
  strokeWidth?: number;
  showLabels?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  level,
  confidence = 88,
  size = 240,
  strokeWidth = 18,
  showLabels = true,
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Semicircle / 240-degree arc
  const arcDegree = 240;
  const arcLength = (circumference * arcDegree) / 360;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  const colorConfig = {
    LOW: {
      stroke: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      textColor: 'text-emerald-500 dark:text-emerald-400',
      tagBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      label: 'LOW RISK',
    },
    MEDIUM: {
      stroke: '#F59E0B',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      textColor: 'text-amber-500 dark:text-amber-400',
      tagBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      label: 'MEDIUM RISK',
    },
    HIGH: {
      stroke: '#EF4444',
      bgGlow: 'rgba(239, 68, 68, 0.15)',
      textColor: 'text-rose-500 dark:text-rose-400',
      tagBg: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      label: 'HIGH RISK',
    },
  }[level];

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Glow ambient background */}
        <div
          className="absolute inset-4 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
          style={{ background: colorConfig.bgGlow }}
        />

        <svg
          width={size}
          height={size}
          className="transform -rotate-210 overflow-visible"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800/80"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Progress Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={colorConfig.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
          <span className="text-xs uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400 mb-1">
            Risk Index
          </span>
          <div className="flex items-baseline justify-center gap-0.5">
            <span className={`text-5xl font-extrabold tracking-tight ${colorConfig.textColor}`}>
              {score}
            </span>
            <span className="text-xl font-bold text-slate-600 dark:text-slate-400">/100</span>
          </div>

          <div className="mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colorConfig.tagBg}`}
            >
              {colorConfig.label}
            </span>
          </div>
        </div>
      </div>

      {showLabels && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {confidence}% Confidence
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 italic">
            Demo model confidence
          </span>
        </div>
      )}
    </div>
  );
};
