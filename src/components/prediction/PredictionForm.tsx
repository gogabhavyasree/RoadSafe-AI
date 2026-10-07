import React, { useState } from 'react';
import {
  PredictionInputs,
  WeatherCondition,
  RoadSurface,
  LightCondition,
  TimeOfDay,
  TrafficDensity,
  RoadType,
} from '../../types';
import { DEMO_LOCATIONS } from '../../data/accidentData';
import { BrainCircuit, Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (inputs: PredictionInputs) => void;
  isLoading?: boolean;
}

const PRESET_SCENARIOS: Array<{
  name: string;
  desc: string;
  badge: 'high' | 'medium' | 'low';
  inputs: PredictionInputs;
}> = [
  {
    name: 'Foggy Night Expressway',
    desc: 'High speed, unlit expressway with low visibility fog',
    badge: 'high',
    inputs: {
      weather: 'Fog',
      roadCondition: 'Wet',
      lightCondition: 'Darkness – Lights Off',
      timeOfDay: 'Night',
      trafficDensity: 'Medium',
      speedLimit: 110,
      vehicles: 3,
      roadType: 'Expressway',
      location: 'Pune (Mumbai-Pune Expressway Bypass)',
    },
  },
  {
    name: 'Monsoon Urban Rush',
    desc: 'Flooded intersection with heavy peak traffic',
    badge: 'high',
    inputs: {
      weather: 'Rain',
      roadCondition: 'Flood',
      lightCondition: 'Darkness – Lights On',
      timeOfDay: 'Evening',
      trafficDensity: 'High',
      speedLimit: 50,
      vehicles: 4,
      roadType: 'Intersection',
      location: 'Vijayawada Central (Benz Circle)',
    },
  },
  {
    name: 'Clear Daytime Commute',
    desc: 'Dry suburban arterial with normal daylight traffic',
    badge: 'low',
    inputs: {
      weather: 'Clear',
      roadCondition: 'Dry',
      lightCondition: 'Daylight',
      timeOfDay: 'Afternoon',
      trafficDensity: 'Low',
      speedLimit: 50,
      vehicles: 1,
      roadType: 'Urban Road',
      location: 'Visakhapatnam (RTC Complex Junction)',
    },
  },
];

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [inputs, setInputs] = useState<PredictionInputs>({
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

  const [errors, setErrors] = useState<{ speedLimit?: string; vehicles?: string }>({});

  const validate = () => {
    const newErrors: { speedLimit?: string; vehicles?: string } = {};
    if (inputs.speedLimit < 10 || inputs.speedLimit > 150) {
      newErrors.speedLimit = 'Speed limit must be between 10 and 150 km/h.';
    }
    if (inputs.vehicles < 1 || inputs.vehicles > 100) {
      newErrors.vehicles = 'Vehicles count must be between 1 and 100.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(inputs);
    }
  };

  const applyPreset = (presetInputs: PredictionInputs) => {
    setInputs(presetInputs);
    setErrors({});
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a1124]/80 p-5 sm:p-6 shadow-lg shadow-black/20">
      {/* Header & Viva Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Feature Vector Configuration
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Set multi-dimensional parameters for the risk classification pipeline
          </p>
        </div>

        {/* Quick Viva Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Presets:
          </span>
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.inputs)}
              className="text-xs px-2.5 py-1 rounded-lg font-semibold bg-slate-100 hover:bg-cyan-500/10 hover:text-cyan-600 dark:bg-slate-800 dark:hover:bg-cyan-500/20 text-slate-600 dark:text-slate-300 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Row 1: Weather & Road Surface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Weather Condition
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['Clear', 'Rain', 'Fog', 'Snow', 'Other'] as WeatherCondition[]).map((w) => (
                <button
                  type="button"
                  key={w}
                  onClick={() => setInputs({ ...inputs, weather: w })}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                    inputs.weather === w
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm shadow-cyan-600/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Road Surface
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Dry', 'Wet', 'Snow/Ice', 'Flood'] as RoadSurface[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setInputs({ ...inputs, roadCondition: r })}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                    inputs.roadCondition === r
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm shadow-cyan-600/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Light Condition & Time of Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Light Condition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Daylight', 'Darkness – Lights On', 'Darkness – Lights Off'] as LightCondition[]).map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setInputs({ ...inputs, lightCondition: l })}
                  className={`py-2 px-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
                    inputs.lightCondition === l
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm shadow-cyan-600/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Time of Day
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Morning', 'Afternoon', 'Evening', 'Night'] as TimeOfDay[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setInputs({ ...inputs, timeOfDay: t })}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                    inputs.timeOfDay === t
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm shadow-cyan-600/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Traffic Density & Road Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Traffic Density
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Medium', 'High'] as TrafficDensity[]).map((td) => (
                <button
                  type="button"
                  key={td}
                  onClick={() => setInputs({ ...inputs, trafficDensity: td })}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    inputs.trafficDensity === td
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm shadow-cyan-600/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {td}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Road Type
            </label>
            <select
              value={inputs.roadType}
              onChange={(e) => setInputs({ ...inputs, roadType: e.target.value as RoadType })}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Highway">Highway</option>
              <option value="Urban Road">Urban Road</option>
              <option value="Rural Road">Rural Road</option>
              <option value="Residential Road">Residential Road</option>
              <option value="Intersection">Intersection</option>
              <option value="Expressway">Expressway</option>
            </select>
          </div>
        </div>

        {/* Row 4: Speed Limit, Vehicles & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Speed Limit */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Speed Limit (km/h)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {inputs.speedLimit} km/h
              </span>
            </div>
            <input
              type="number"
              min={10}
              max={150}
              value={inputs.speedLimit}
              onChange={(e) => setInputs({ ...inputs, speedLimit: Number(e.target.value) })}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.speedLimit && (
              <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.speedLimit}
              </p>
            )}
          </div>

          {/* Number of Vehicles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Vehicles Involved
              </label>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {inputs.vehicles} {inputs.vehicles === 1 ? 'vehicle' : 'vehicles'}
              </span>
            </div>
            <input
              type="number"
              min={1}
              max={100}
              value={inputs.vehicles}
              onChange={(e) => setInputs({ ...inputs, vehicles: Number(e.target.value) })}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.vehicles && (
              <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.vehicles}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Location / Corridor
            </label>
            <select
              value={inputs.location}
              onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {DEMO_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Weighted model: Environment (35%), Roadway (30%), Traffic (25%), Kinematics (10%)
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Computing Risk Model...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-4 h-4" />
                <span>Predict Accident Risk</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
