import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  BarChart3,
  MapPin,
  Database,
  Cpu,
  GitBranch,
  Shield,
  Sun,
  Moon,
  Sparkles,
  Info,
  UploadCloud,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useDataset } from '../../context/DatasetContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { records } = useDataset();

  const navItems = [
    { label: 'Risk Prediction', path: '/predict', icon: BrainCircuit, badge: 'AI' },
    { label: 'Upload Dataset', path: '/upload', icon: UploadCloud, badge: 'CSV' },
    { label: 'Live Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Analytics & Insights', path: '/analytics', icon: BarChart3 },
    { label: 'High-Risk Hotspots', path: '/hotspots', icon: MapPin },
    { label: 'Accident Data Explorer', path: '/accidents', icon: Database, badge: String(records.length) },
    { label: 'ML Models & Pipeline', path: '/model', icon: Cpu },
    { label: 'Data Mining Workflow', path: '/workflow', icon: GitBranch, badge: 'DMDW' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ease-in-out border-r bg-white/95 dark:bg-[#070d19]/95 border-slate-200 dark:border-slate-800/80 backdrop-blur-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 dark:border-slate-800/80">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  RoadSafe
                </span>
                <span className="text-xs font-bold text-cyan-500 dark:text-cyan-400">
                  AI
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                DMDW Analytics
              </p>
            </div>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            PLATFORM MODULES
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    item.path === '/upload' || item.badge === 'AI' || item.badge === 'CSV'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Active ML Engine Card (RoadSafe AI Electric Cyan / Deep Navy Identity) */}
        <div className="p-3 mx-3 mb-2 rounded-xl bg-[#0a1224] border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-300">Active ML Engine</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold">v2.4</span>
          </div>
          <p className="text-xs font-bold text-white">Random Forest Classifier</p>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">Accuracy: 94.2% | F1: 0.91</p>
        </div>

        {/* Bottom Bar: Theme Toggle & Info */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#060b17] dark:hover:bg-[#0d162d] border border-slate-200/80 dark:border-slate-800/80 transition-colors"
            title="Toggle Light / Dark mode"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-cyan-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <NavLink
            to="/workflow"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-[#060b17] hover:bg-slate-200 dark:hover:bg-[#0d162d] border border-slate-200/80 dark:border-slate-800/80 transition-colors"
            title="View DMDW Schema"
          >
            <Info className="w-4 h-4 text-cyan-400" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};
