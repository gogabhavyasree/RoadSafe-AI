import React from 'react';
import { ModelMetric } from '../types';
import { ModelMetricCard } from '../components/model/ModelMetricCard';
import { ConfusionMatrix } from '../components/model/ConfusionMatrix';
import { Cpu, ShieldAlert, BarChart3, ScatterChart as ScatterIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  Line,
  ComposedChart,
} from 'recharts';

export const ModelPerformance: React.FC = () => {
  // Demonstration evaluation metrics as specified in Section 19
  const models: ModelMetric[] = [
    {
      name: 'K-Nearest Neighbors',
      shortName: 'KNN (k=7)',
      accuracy: 89.2,
      precision: 87.8,
      recall: 86.5,
      f1: 87.1,
      trainingTime: '1.2s',
      inferenceLatency: '24ms',
      description: 'Instance-based non-parametric classifier using normalized Euclidean distance across weather and speed coordinates.',
    },
    {
      name: 'Logistic Regression',
      shortName: 'Multinomial LogReg',
      accuracy: 91.4,
      precision: 90.2,
      recall: 89.7,
      f1: 89.9,
      trainingTime: '0.4s',
      inferenceLatency: '4ms',
      description: 'Linear probabilistic classification with L2 ridge regularization and calibrated odds ratios per environmental coefficient.',
    },
    {
      name: 'Support Vector Machine',
      shortName: 'SVM (RBF Kernel)',
      accuracy: 92.1,
      precision: 91.5,
      recall: 90.8,
      f1: 91.1,
      trainingTime: '3.8s',
      inferenceLatency: '11ms',
      description: 'Maximum-margin hyperplane optimization utilizing Radial Basis Function kernel to separate non-linear risk interactions.',
      isBest: true,
    },
  ];

  // Recharts Model Comparison Data
  const comparisonData = [
    { metric: 'Accuracy', KNN: 89.2, LogReg: 91.4, SVM: 92.1 },
    { metric: 'Precision', KNN: 87.8, LogReg: 90.2, SVM: 91.5 },
    { metric: 'Recall', KNN: 86.5, LogReg: 89.7, SVM: 90.8 },
    { metric: 'F1-Score', KNN: 87.1, LogReg: 89.9, SVM: 91.1 },
  ];

  // Actual vs Predicted Risk distribution bins (Section 21)
  const actualVsPredictedData = [
    { riskBin: '0–20 (Minimal)', actualCount: 42, predictedCount: 40, variance: -2 },
    { riskBin: '21–40 (Low)', actualCount: 56, predictedCount: 58, variance: +2 },
    { riskBin: '41–60 (Moderate)', actualCount: 68, predictedCount: 65, variance: -3 },
    { riskBin: '61–80 (Substantial)', actualCount: 48, predictedCount: 51, variance: +3 },
    { riskBin: '81–100 (Severe)', actualCount: 36, predictedCount: 36, variance: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Model Evaluation & Benchmarking
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Machine Learning Model Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Comparative empirical evaluation of supervised classification algorithms applied to the accident risk feature space.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: Academic Demo Data</span>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {models.map((m) => (
          <ModelMetricCard key={m.name} model={m} />
        ))}
      </div>

      {/* Recharts Model Metric Comparison (Section 22) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-5 shadow-lg shadow-black/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Cross-Algorithm Metric Benchmark
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              KNN vs Logistic Regression vs Support Vector Machine across standard classification metrics
            </p>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
            10-Fold Cross-Validation
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="metric" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis domain={[80, 100]} stroke="#64748b" fontSize={11} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a1124',
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff',
                }}
                formatter={(val: any) => [`${val}%`, '']}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Bar dataKey="KNN" name="K-NN (89.2%)" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="LogReg" name="Logistic Regression (91.4%)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SVM" name="Support Vector Machine (92.1% Best)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix & Actual vs Predicted Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Confusion Matrix Heatmap (Section 20) */}
        <ConfusionMatrix />

        {/* Actual vs Predicted Risk (Section 21) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-5 shadow-lg shadow-black/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Actual vs Predicted Risk Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ground-truth test incident counts versus model class predictions across risk strata
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={actualVsPredictedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="riskBin" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a1124',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Legend verticalAlign="bottom" height={32} />
                <Bar dataKey="actualCount" name="Actual Incidents" fill="#0284c7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="predictedCount" name="Predicted Cases" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="variance" name="Residual Variance" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>R² Goodness of Fit: 0.941</span>
            <span>Mean Absolute Error (MAE): 2.4 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
