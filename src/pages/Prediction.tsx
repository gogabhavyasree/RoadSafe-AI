import React, { useState, useEffect } from 'react';
import { PredictionInputs, PredictionOutput } from '../types';
import { RiskEngineService } from '../services/riskEngine';
import { PredictionForm } from '../components/prediction/PredictionForm';
import { RiskGauge } from '../components/ui/RiskGauge';
import { FactorBreakdown } from '../components/prediction/FactorBreakdown';
import { SafetyRecommendations } from '../components/prediction/SafetyRecommendations';
import { PredictionHistory } from '../components/prediction/PredictionHistory';
import { useToast } from '../context/ToastContext';
import { BrainCircuit, Sparkles, MapPin, Gauge } from 'lucide-react';

export const Prediction: React.FC = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initial calculation with default parameters
  const [currentResult, setCurrentResult] = useState<PredictionOutput>(() => {
    return RiskEngineService.calculateRisk({
      weather: 'Rain',
      roadCondition: 'Wet',
      lightCondition: 'Darkness – Lights On',
      timeOfDay: 'Night',
      trafficDensity: 'High',
      speedLimit: 80,
      vehicles: 3,
      roadType: 'Highway',
      location: 'Vijayawada Central (Benz Circle)',
    });
  });

  // History state with localStorage persistence
  const [history, setHistory] = useState<PredictionOutput[]>(() => {
    try {
      const saved = localStorage.getItem('roadsafe-prediction-history');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('roadsafe-prediction-history', JSON.stringify(history));
  }, [history]);

  const handlePredict = (inputs: PredictionInputs) => {
    setIsLoading(true);

    // Simulate realistic 300ms model inference delay for executive feel
    setTimeout(() => {
      const result = RiskEngineService.calculateRisk(inputs);
      setCurrentResult(result);
      setHistory((prev) => [result, ...prev.slice(0, 19)]); // keep last 20
      setIsLoading(false);

      showToast(
        'Accident Risk Evaluated',
        `Score: ${result.riskScore}/100 (${result.riskLevel} RISK) calculated for ${inputs.location.split('(')[0].trim()}.`,
        result.riskLevel === 'HIGH' ? 'warning' : 'success'
      );
    }, 320);
  };

  const handleRerun = (item: PredictionOutput) => {
    handlePredict(item.inputs);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('roadsafe-prediction-history');
    showToast('History Cleared', 'All previous prediction records removed.', 'info');
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Predictive Inference Studio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Accident Risk Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Enter environmental, geometric, and traffic conditions to generate a model-based accident risk estimate with transparent factor attribution.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: Academic Demo Data</span>
        </div>
      </div>

      {/* Main Prediction Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7">
          <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
        </div>

        {/* Right: Live Result Display (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Risk Output Panel */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 backdrop-blur-md p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80 mb-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Gauge className="w-4 h-4 text-cyan-500" />
                <span>Simulated Output</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">
                ID: {currentResult.id}
              </span>
            </div>

            {/* Target Location Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#060b17] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold mb-4 text-center">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span className="truncate max-w-[240px]">
                {currentResult.inputs.location}
              </span>
            </div>

            {/* Circular Gauge */}
            <RiskGauge
              score={currentResult.riskScore}
              level={currentResult.riskLevel}
              confidence={currentResult.confidence}
              size={230}
            />

            <div className="mt-4 text-center max-w-sm">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Composite evaluation incorporating {currentResult.contributingFactors.length} critical roadway & environmental hazard markers.
              </p>
            </div>
          </div>

          {/* Explainability Breakdown (XAI) */}
          <FactorBreakdown
            factors={currentResult.contributingFactors}
            totalScore={currentResult.riskScore}
          />

          {/* Safety Recommendations */}
          <SafetyRecommendations
            recommendations={currentResult.safetyRecommendations}
          />
        </div>
      </div>

      {/* Prediction History Table */}
      <PredictionHistory
        history={history}
        onRerun={handleRerun}
        onClear={handleClearHistory}
      />
    </div>
  );
};
