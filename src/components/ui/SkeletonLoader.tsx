import React from 'react';

export const SkeletonBox: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800/80 ${className}`}
    />
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-3 w-full">
      <SkeletonBox className="h-10 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex gap-4 items-center p-3">
          <SkeletonBox className="h-6 w-20" />
          <SkeletonBox className="h-6 w-36" />
          <SkeletonBox className="h-6 w-24" />
          <SkeletonBox className="h-6 w-28" />
          <SkeletonBox className="h-6 flex-1" />
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonBox className="h-4 w-28" />
        <SkeletonBox className="h-8 w-8 rounded-lg" />
      </div>
      <SkeletonBox className="h-8 w-36" />
      <SkeletonBox className="h-3 w-48" />
    </div>
  );
};
