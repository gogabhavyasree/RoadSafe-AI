import React from 'react';
import { RiskLevel, AccidentSeverity } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'low' | 'medium' | 'high' | 'info' | 'neutral' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  const variantClasses = {
    low: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-400',
    medium: 'bg-amber-500/10 text-amber-500 border border-amber-500/25 dark:bg-amber-500/15 dark:text-amber-400',
    high: 'bg-rose-500/10 text-rose-500 border border-rose-500/25 dark:bg-rose-500/15 dark:text-rose-400',
    info: 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/25 dark:bg-cyan-500/15 dark:text-cyan-400',
    neutral: 'bg-slate-500/10 text-slate-600 border border-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/60',
    purple: 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/25 dark:bg-indigo-500/15 dark:text-indigo-400',
  };

  const dotClasses = {
    low: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    medium: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    high: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]',
    info: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
    neutral: 'bg-slate-400',
    purple: 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full tracking-wide transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
};

export const RiskBadge: React.FC<{ level: RiskLevel; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  level,
  size = 'md',
  className = '',
}) => {
  const map: Record<RiskLevel, 'low' | 'medium' | 'high'> = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
  };

  return (
    <Badge variant={map[level]} size={size} dot className={className}>
      {level} RISK
    </Badge>
  );
};

export const SeverityBadge: React.FC<{ severity: AccidentSeverity; size?: 'sm' | 'md' }> = ({
  severity,
  size = 'sm',
}) => {
  const map: Record<AccidentSeverity, 'low' | 'info' | 'medium' | 'high'> = {
    Minor: 'low',
    Moderate: 'info',
    Severe: 'medium',
    Fatal: 'high',
  };

  return (
    <Badge variant={map[severity]} size={size}>
      {severity}
    </Badge>
  );
};
