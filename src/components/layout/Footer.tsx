import React from 'react';
import { Shield, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-[#060a14] text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column: Brand & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-white">RoadSafe</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                AI
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Turn historical road and weather telemetry into actionable accident risk intelligence.
            High-precision machine learning prediction platform for road safety surveillance and spatial hazard prevention.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              V2.4 PRODUCTION READY
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
              SCIKIT-LEARN ML ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Center Column: Core Capabilities */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Core Capabilities
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/predict" className="hover:text-cyan-400 transition-colors">
                AI Risk Prediction Engine
              </Link>
            </li>
            <li>
              <Link to="/upload" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <span>CSV Dataset Ingestion & Preprocessing</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">NEW</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                Live Monitoring Dashboard
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="hover:text-cyan-400 transition-colors">
                Trend & Correlation Analytics
              </Link>
            </li>
            <li>
              <Link to="/hotspots" className="hover:text-cyan-400 transition-colors">
                High-Risk Spatial Hotspot Mapping
              </Link>
            </li>
            <li>
              <Link to="/model" className="hover:text-cyan-400 transition-colors">
                Model Comparison & Pipeline Evaluation
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Academic Project Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Academic Project Info
          </h4>
          <div className="space-y-1.5 text-xs">
            <p>
              <strong className="text-slate-300">Project:</strong> Road Accident Risk Prediction Using Data Mining
            </p>
            <p>
              <strong className="text-slate-300">Domain:</strong> Data Mining & Data Warehousing (DMDW)
            </p>
            <p>
              <strong className="text-slate-300">Core Models:</strong> Random Forest, Gradient Boosting, Decision Tree
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/workflow"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a1224] hover:bg-[#121c38] text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-bold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Viva Defense Guide & Q&A</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>© 2026 RoadSafe AI • Academic Data Mining Prototype</p>
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Client-Side In-Memory Analytical Processing (OLAP)</span>
        </div>
      </div>
    </footer>
  );
};
