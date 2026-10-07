import React, { useState } from 'react';
import { Database, Filter, Sliders, Cpu, BrainCircuit, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';

export const PipelineStages: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState(0);

  const stages = [
    {
      id: '01',
      title: 'Data Collection',
      icon: Database,
      subtitle: 'Ingesting Multi-Source Incident Records',
      summary: 'Collect historical accident observations from municipal traffic feeds, meteorological sensors, and police FIR logs.',
      inputs: ['Traffic police casualty reports', 'Local road transport authorities (RTA)', 'Automated weather stations (AWS)', 'Smart-city surveillance cameras'],
      techniques: ['Batch ingestion APIs', 'Spatial coordinates geocoding', 'Temporal timestamp harmonization'],
      output: 'Raw Accident Event Store (Unstructured / Semi-structured JSON & CSV logs)',
    },
    {
      id: '02',
      title: 'Data Preprocessing',
      icon: Filter,
      subtitle: 'Cleaning, Imputation & Normalization',
      summary: 'Handle noisy records, missing parameters, duplicate reports, and outlier values to guarantee data integrity.',
      inputs: ['Raw Event Store (Missing fields, duplicates)'],
      techniques: ['K-NN Imputation for missing speed values', 'Deduplication across cross-agency logs', 'One-Hot Encoding for categorical road types', 'Min-Max scaling of continuous numerical ranges'],
      output: 'Cleaned, Standardized Analytical Dataset Ready for Feature Extraction',
    },
    {
      id: '03',
      title: 'Feature Selection',
      icon: Sliders,
      subtitle: 'Dimensionality Reduction & Relevance',
      summary: 'Extract high-information attributes that mathematically correlate with accident occurrence and severity.',
      inputs: ['48 initial candidate variables'],
      techniques: ['Information Gain / Mutual Information ranking', 'Pearson correlation colinearity elimination', 'Random Forest Gini Impurity feature importance'],
      output: '9 Essential Feature Vectors (Weather, Road Surface, Lighting, Time, Traffic, Speed, Vehicles, Road Type, Location)',
    },
    {
      id: '04',
      title: 'Data Mining / ML Modeling',
      icon: Cpu,
      subtitle: 'Supervised Algorithm Training & Tuning',
      summary: 'Evaluate multiple pattern recognition and classification algorithms for maximum predictive power.',
      inputs: ['Selected Feature Matrix (80/20 Train-Test Split)'],
      techniques: ['K-Nearest Neighbors (K=7, Euclidean distance)', 'Logistic Regression (L2 regularization, multi-class)', 'Support Vector Machine (RBF Kernel, hyperparameter grid search)'],
      output: 'Trained Classification Models (SVM achieved 92.1% validation accuracy)',
    },
    {
      id: '05',
      title: 'Risk Prediction',
      icon: BrainCircuit,
      subtitle: 'Real-Time Inference & XAI Breakdown',
      summary: 'Generate deterministic risk scores, discrete severity levels, and factor attribution for any input scenario.',
      inputs: ['Live / Projected environmental condition vector'],
      techniques: ['Multi-factor weighted hazard model', 'Normalized Risk Index calculation (0-100)', 'Confidence estimation', 'Dynamic safety advisory rules engine'],
      output: 'Risk Score (0-100), Level (Low/Med/High), Contributing Factor Weights, Tailored Recommendations',
    },
    {
      id: '06',
      title: 'Visualization & Insights',
      icon: BarChart3,
      subtitle: 'Spatial Hotspots & Executive Dashboards',
      summary: 'Transform raw predictive scores into interactive smart-city intelligence for planners and safety administrators.',
      inputs: ['Risk scores, historical warehouse facts, geographic boundaries'],
      techniques: ['Spatial heatmap clustering', 'Time-series trend analysis', 'Interactive OLAP aggregation charts', 'Responsive mobile-friendly dashboards'],
      output: 'RoadSafe AI Web Platform with spatial maps, analytics charts, and data explorer',
    },
  ];

  const active = stages[selectedStage];

  return (
    <div className="space-y-6">
      {/* Stage Flow Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = selectedStage === idx;

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(idx)}
              className={`text-left p-3.5 rounded-2xl border transition-all relative ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/50 font-bold'
                  : 'bg-white dark:bg-[#0a1124]/80 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-mono font-extrabold ${
                    isSelected ? 'text-slate-950 font-black' : 'text-cyan-500'
                  }`}
                >
                  STAGE {stage.id}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
              </div>
              <h4 className="text-xs font-bold truncate">{stage.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
            <active.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-500">
                Phase {active.id}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                DMDW Pipeline Architecture
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {active.title} — {active.subtitle}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {active.summary}
        </p>

        {/* 3 Detail Columns */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Inputs */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
              Source Inputs
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-medium">
              {active.inputs.map((inp, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-500 mt-0.5">•</span>
                  <span>{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Techniques */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
              Techniques & Algorithms
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-medium">
              {active.techniques.map((tec, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stage Output */}
          <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/30">
            <h4 className="font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 text-[10px] mb-2">
              Pipeline Output
            </h4>
            <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
              {active.output}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
