import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, BarChart3, MapPin, GitBranch } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Predict Accident Risk',
      description: 'Run multi-factor ML simulation with environmental & roadway inputs.',
      icon: BrainCircuit,
      path: '/predict',
      gradient: 'from-cyan-600 to-blue-600',
      badge: 'Interactive',
    },
    {
      title: 'Explore Analytics',
      description: 'Analyze trends across severity, weather patterns, and time corridors.',
      icon: BarChart3,
      path: '/analytics',
      gradient: 'from-blue-600 to-indigo-600',
      badge: '6 Charts',
    },
    {
      title: 'View Hotspots',
      description: 'Explore geographic risk heat zones and high-frequency accident junctions.',
      icon: MapPin,
      path: '/hotspots',
      gradient: 'from-amber-600 to-rose-600',
      badge: 'Spatial Map',
    },
    {
      title: 'DMDW Workflow',
      description: 'Inspect the star-schema warehouse model and end-to-end mining pipeline.',
      icon: GitBranch,
      path: '/workflow',
      gradient: 'from-purple-600 to-cyan-600',
      badge: 'Star Schema',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.path}
            onClick={() => navigate(act.path)}
            className="group text-left p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 hover:bg-slate-50 dark:hover:bg-[#0f1a36] hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-black/20"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-5 rounded-bl-full pointer-events-none group-hover:opacity-10 transition-opacity" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {act.badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                {act.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {act.description}
              </p>
            </div>
            <div className="mt-4 pt-2 flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <span>Launch Module</span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
