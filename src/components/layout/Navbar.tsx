import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, ChevronRight, BrainCircuit, Activity, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useDataset } from '../../context/DatasetContext';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const ROUTE_NAMES: Record<string, { title: string; category: string }> = {
  '/': { title: 'Overview', category: 'Home' },
  '/upload': { title: 'Dataset Upload & Processing', category: 'Data Engineering' },
  '/dashboard': { title: 'Command Center', category: 'Intelligence' },
  '/predict': { title: 'Risk Prediction', category: 'AI Inference' },
  '/analytics': { title: 'Accident Analytics', category: 'Exploration' },
  '/hotspots': { title: 'High-Risk Hotspots', category: 'Spatial Mining' },
  '/accidents': { title: 'Accident Data Explorer', category: 'Warehouse' },
  '/model': { title: 'ML Model Performance', category: 'Evaluation' },
  '/workflow': { title: 'Data Mining Workflow', category: 'Architecture' },
};

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { records } = useDataset();

  const currentRoute = ROUTE_NAMES[location.pathname] || {
    title: 'RoadSafe AI',
    category: 'System',
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full flex items-center justify-between px-4 sm:px-6 border-b bg-white/90 dark:bg-[#070d19]/90 border-slate-200 dark:border-slate-800/80 backdrop-blur-xl transition-colors">
      {/* Left: Mobile hamburger & Project Logo / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Project Branding in Top Header (matching reference layout) */}
        <Link to="/" className="flex items-center gap-2.5 group mr-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 font-bold" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                ROADSAFE
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                AI
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              Accident Prevention
            </p>
          </div>
        </Link>

        {/* Subtle Breadcrumb for Current Page */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold pl-2 border-l border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">
            {currentRoute.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-900 dark:text-white font-bold truncate max-w-[150px]">
            {currentRoute.title}
          </span>
        </div>
      </div>

      {/* Right: Status Pill, Theme Toggle, and Primary Glowing Action Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Status Badge: "AI Engine: Online" */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#0a1224] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px]">AI Engine: Online</span>
        </div>

        {/* Theme Toggle Button in Header */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#0a1224] dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          title="Toggle Light / Dark theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-cyan-600" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {/* Primary Glowing Cyan/Teal Action Button */}
        {location.pathname !== '/predict' ? (
          <button
            onClick={() => navigate('/predict')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Predict Risk</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        )}
      </div>
    </header>
  );
};
