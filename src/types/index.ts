export type WeatherCondition = 'Clear' | 'Rain' | 'Fog' | 'Snow' | 'Other';
export type RoadSurface = 'Dry' | 'Wet' | 'Snow/Ice' | 'Flood';
export type LightCondition = 'Daylight' | 'Darkness – Lights On' | 'Darkness – Lights Off';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';
export type TrafficDensity = 'Low' | 'Medium' | 'High';
export type RoadType = 'Highway' | 'Urban Road' | 'Rural Road' | 'Residential Road' | 'Intersection' | 'Expressway';
export type AccidentSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Fatal';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RawDatasetRecord {
  'Accident ID'?: string;
  'accident_id'?: string;
  'id'?: string;
  'Date'?: string;
  'date'?: string;
  'Location'?: string;
  'location'?: string;
  'Weather'?: string;
  'weather'?: string;
  'Road Condition'?: string;
  'road_condition'?: string;
  'Light Condition'?: string;
  'light_condition'?: string;
  'Time of Day'?: string;
  'time_of_day'?: string;
  'Traffic Density'?: string;
  'traffic_density'?: string;
  'Speed Limit (km/h)'?: string | number;
  'speed_limit'?: string | number;
  'Vehicles Involved'?: string | number;
  'vehicles'?: string | number;
  'Road Type'?: string;
  'road_type'?: string;
  'Severity'?: string;
  'severity'?: string;
  'Risk Score'?: string | number;
  'risk_score'?: string | number;
  'Risk Level'?: string;
  'risk_level'?: string;
  [key: string]: unknown;
}

export interface AccidentRecord {
  id: string;
  date: string;
  location: string;
  weather: WeatherCondition;
  roadCondition: RoadSurface;
  lightCondition: LightCondition;
  timeOfDay: TimeOfDay;
  trafficDensity: TrafficDensity;
  speedLimit: number;
  vehicles: number;
  roadType: RoadType;
  severity: AccidentSeverity;
  riskScore: number;
  riskLevel: RiskLevel;
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // For custom map grid rendering
    yPercent: number;
  };
  factors?: string[];
}

export interface PredictionInputs {
  weather: WeatherCondition;
  roadCondition: RoadSurface;
  lightCondition: LightCondition;
  timeOfDay: TimeOfDay;
  trafficDensity: TrafficDensity;
  speedLimit: number;
  vehicles: number;
  roadType: RoadType;
  location: string;
}

export interface ContributingFactor {
  factor: string;
  impact: number;
  category: 'Environment' | 'Roadway' | 'Traffic' | 'Vehicle';
  description: string;
}

export interface PredictionOutput {
  id: string;
  riskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  contributingFactors: ContributingFactor[];
  safetyRecommendations: string[];
  timestamp: string;
  inputs: PredictionInputs;
}

export interface HotspotLocation {
  id: string;
  location: string;
  accidentCount: number;
  mostCommonWeather: WeatherCondition;
  averageSeverity: AccidentSeverity;
  averageRiskScore: number;
  riskLevel: RiskLevel;
  xPercent: number;
  yPercent: number;
  fatalities: number;
  injuries: number;
  primaryRiskFactor: string;
}

export interface ModelMetric {
  name: string;
  shortName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  trainingTime: string;
  inferenceLatency: string;
  description: string;
  isBest?: boolean;
}

export interface AnalyticsFilterState {
  startDate: string;
  endDate: string;
  weather: string;
  severity: string;
  location: string;
  roadCondition: string;
  riskLevel: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  duration?: number;
}
