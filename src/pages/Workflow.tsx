import React from 'react';
import { PipelineStages } from '../components/workflow/PipelineStages';
import { StarSchemaDiagram } from '../components/workflow/StarSchemaDiagram';
import { GitBranch, Database, Award, BookOpen, Layers } from 'lucide-react';

export const Workflow: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              DMDW Academic Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Data Mining & Warehousing Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Complete end-to-end transformation framework: From raw municipal incident capture through cleaning, star-schema modeling, ML risk classification, and executive visualization.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: Academic Demo Data</span>
        </div>
      </div>

      {/* Section 1: The 6-Stage End-to-End Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-500" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            End-to-End Data Mining Lifecycle
          </h2>
        </div>
        <PipelineStages />
      </section>

      {/* Section 2: DMDW Concept & Star Schema Architecture */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-500" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Data Warehouse Dimensional Modeling
          </h2>
        </div>
        <StarSchemaDiagram />
      </section>

      {/* Section 3: Viva Presentation Talking Points for Student Evaluation */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <BookOpen className="w-5 h-5 text-cyan-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              DMDW Laboratory Viva Defense Guide
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Key academic competencies demonstrated in RoadSafe AI
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>1. ETL & Preprocessing</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Showcases handling of disparate municipal feeds, imputing incomplete telemetry (speed limits, light conditions), and standardizing categorical labels into numerical vectors for algorithmic consumption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>2. Dimensional Modeling</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Implements a classic Star Schema with central <code>FACT_ACCIDENT</code> surrounded by 5 normalized dimension tables enabling sub-second OLAP roll-up, drill-down, and slice & dice operations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060b17] border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>3. Supervised Classification</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Compares KNN, Multinomial Logistic Regression, and RBF Kernel SVM classifiers. Achieves 92.1% accuracy while explaining factor weights via post-hoc feature attribution.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
