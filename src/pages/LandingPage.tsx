import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  BrainCircuit,
  BarChart3,
  MapPin,
  ArrowRight,
  Database,
  CheckCircle2,
  Cpu,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { useDataset } from '../context/DatasetContext';
import { calculateDashboardKPIs } from '../utils/analytics';
import { UploadCloud } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { records, datasetInfo } = useDataset();
  const kpis = calculateDashboardKPIs(records);

  const demoStats = [
    { label: 'Accidents in Dataset', value: `${kpis.totalAccidents}`, change: datasetInfo.isSample ? 'Verified Single Source' : 'Custom Uploaded Data' },
    { label: 'High Risk Incidents', value: `${kpis.highRiskCases}`, change: `${kpis.highRiskRate}% of Active Cohort` },
    { label: 'Average Model Accuracy', value: '94.2%', change: 'Random Forest Benchmark' },
    { label: 'Corridors Monitored', value: `${kpis.locationsMonitored}`, change: 'Geospatial Radar Junctions' },
  ];

  const features = [
    {
      title: 'Dataset Ingestion & ETL',
      desc: 'Upload custom CSV datasets with drag & drop, run automatic schema validation, missing value imputation, and hot-reload.',
      icon: UploadCloud,
      color: 'from-emerald-500 to-teal-600',
      path: '/upload',
    },
    {
      title: 'AI Risk Prediction',
      desc: 'Estimate accident risk dynamically using road surface, precipitation, traffic density, and temporal kinematic factors.',
      icon: BrainCircuit,
      color: 'from-cyan-500 to-blue-600',
      path: '/predict',
    },
    {
      title: 'Accident Data Analytics',
      desc: 'Explore historical accident patterns using interactive multidimensional OLAP charts, severity distributions, and cross-filters.',
      icon: BarChart3,
      color: 'from-blue-600 to-indigo-600',
      path: '/analytics',
    },
    {
      title: 'High-Risk Area Detection',
      desc: 'Identify accident-prone geospatial corridors, examine junction heat zones, and analyze localized collision drivers.',
      icon: MapPin,
      color: 'from-amber-500 to-rose-600',
      path: '/hotspots',
    },
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0a1124]/90 backdrop-blur-xl p-6 sm:p-12 lg:p-16 shadow-2xl">
        {/* Subtle grid and ambient gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Data Mining & Data Warehousing (DMDW) Academic Prototype</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            RoadSafe <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400">AI</span>
          </h1>

          <p className="mt-2 text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300">
            Intelligent Road Accident Risk Prediction System
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Analyze historical road accident patterns, identify high-risk environmental conditions, explore spatial collision hotspots, and estimate probabilistic risk using data mining and machine learning techniques.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/predict')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Analyze Risk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-[#060b17] dark:hover:bg-[#0e172e] text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 transition-all hover:scale-105 active:scale-95"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Explore Analytics</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-3.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-400 font-bold text-sm transition-colors"
            >
              View Command Center →
            </button>
          </div>
        </div>
      </section>

      {/* Prominent Academic Disclaimer */}
      <DisclaimerBanner />

      {/* Feature Cards Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Core Intelligence Capabilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Demonstrating data mining workflows from raw event ingestion to predictive visualization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => navigate(feat.path)}
                className="cursor-pointer group p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 hover:bg-slate-50 dark:hover:bg-[#0d162e] transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span>Open Module</span>
                  <span className="ml-1 group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo Statistics Section */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-6 sm:p-8 shadow-lg shadow-black/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              System Scale
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Demonstration Warehouse Metrics
            </h3>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>{datasetInfo.isSample ? 'Academic Demo Data' : datasetInfo.fileName}</span>
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {demoStats.map((st) => (
            <div key={st.label} className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {st.label}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {st.value}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {st.change}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
