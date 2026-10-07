import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  accentColor?: 'cyan' | 'red' | 'amber' | 'emerald' | 'blue';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  trend,
  accentColor = 'cyan',
}) => {
  const colorMap = {
    cyan: {
      iconBg: 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20',
      glow: 'hover:border-cyan-500/30',
    },
    red: {
      iconBg: 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20',
      glow: 'hover:border-rose-500/30',
    },
    amber: {
      iconBg: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20',
      glow: 'hover:border-amber-500/30',
    },
    emerald: {
      iconBg: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
      glow: 'hover:border-emerald-500/30',
    },
    blue: {
      iconBg: 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20',
      glow: 'hover:border-blue-500/30',
    },
  }[accentColor];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${colorMap.glow} bg-white dark:bg-[#0a1124]/80 border border-slate-200 dark:border-slate-800/80 shadow-lg shadow-black/20`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>
            {badge && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className={`p-3 rounded-xl border ${colorMap.iconBg} shadow-sm shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400 truncate font-medium">
              {subtitle}
            </span>
          )}
          {trend && (
            <span
              className={`font-semibold shrink-0 ${
                trend.isNeutral
                  ? 'text-slate-500 dark:text-slate-400'
                  : trend.isPositive
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : 'text-rose-500 dark:text-rose-400'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
