import {
  AccidentRecord,
  HotspotLocation,
  WeatherCondition,
  RoadSurface,
  LightCondition,
  TimeOfDay,
  TrafficDensity,
  RoadType,
  AccidentSeverity,
  RiskLevel,
  RawDatasetRecord,
} from '../types';
import rawDataset from './rawDataset.json';

// Coordinate lookup for GIS spatial mapping
export const LOCATION_GEO_MAP: Record<string, { lat: number; lng: number; x: number; y: number }> = {
  'Vijayawada Central (Benz Circle)': { lat: 16.5062, lng: 80.6480, x: 55, y: 58 },
  'Hyderabad (Outer Ring Road - Gachibowli)': { lat: 17.4401, lng: 78.3489, x: 42, y: 50 },
  'Visakhapatnam (RTC Complex Junction)': { lat: 17.6868, lng: 83.2185, x: 68, y: 46 },
  'Bengaluru (Silk Board Junction)': { lat: 12.9176, lng: 77.6238, x: 38, y: 72 },
  'Chennai (Guindy Kathipara Flyover)': { lat: 13.0067, lng: 80.2023, x: 52, y: 76 },
  'Mumbai (Western Express Highway)': { lat: 19.0760, lng: 72.8777, x: 22, y: 44 },
  'Delhi (Ring Road - AIIMS Junction)': { lat: 28.5672, lng: 77.2100, x: 36, y: 20 },
  'Pune (Mumbai-Pune Expressway Bypass)': { lat: 18.5204, lng: 73.8567, x: 26, y: 54 },
  'Guntur (Nallapadu Highway Corridor)': { lat: 16.3067, lng: 80.4365, x: 53, y: 62 },
  'Amaravati (Seed Access Road)': { lat: 16.5417, lng: 80.5158, x: 51, y: 56 },
};

export const DEMO_LOCATIONS = Object.entries(LOCATION_GEO_MAP).map(([name, geo]) => ({
  name,
  lat: geo.lat,
  lng: geo.lng,
  x: geo.x,
  y: geo.y,
}));

/**
 * Normalization helper functions
 */
const normalizeWeather = (val?: string): WeatherCondition => {
  if (!val) return 'Clear';
  const clean = val.trim().toLowerCase();
  if (clean.includes('rain')) return 'Rain';
  if (clean.includes('fog')) return 'Fog';
  if (clean.includes('snow')) return 'Snow';
  if (clean.includes('clear')) return 'Clear';
  return 'Other';
};

const normalizeRoad = (val?: string): RoadSurface => {
  if (!val) return 'Dry';
  const clean = val.trim().toLowerCase();
  if (clean.includes('flood')) return 'Flood';
  if (clean.includes('snow') || clean.includes('ice')) return 'Snow/Ice';
  if (clean.includes('wet')) return 'Wet';
  return 'Dry';
};

const normalizeLight = (val?: string): LightCondition => {
  if (!val) return 'Daylight';
  const clean = val.trim().toLowerCase();
  if (clean.includes('off')) return 'Darkness – Lights Off';
  if (clean.includes('on')) return 'Darkness – Lights On';
  return 'Daylight';
};

const normalizeTime = (val?: string): TimeOfDay => {
  if (!val) return 'Morning';
  const clean = val.trim().toLowerCase();
  if (clean.includes('night')) return 'Night';
  if (clean.includes('eve')) return 'Evening';
  if (clean.includes('after')) return 'Afternoon';
  return 'Morning';
};

const normalizeTraffic = (val?: string): TrafficDensity => {
  if (!val) return 'Medium';
  const clean = val.trim().toLowerCase();
  if (clean.includes('high')) return 'High';
  if (clean.includes('low')) return 'Low';
  return 'Medium';
};

const normalizeRoadType = (val?: string): RoadType => {
  if (!val) return 'Urban Road';
  const clean = val.trim().toLowerCase();
  if (clean.includes('express')) return 'Expressway';
  if (clean.includes('high')) return 'Highway';
  if (clean.includes('inter')) return 'Intersection';
  if (clean.includes('rural')) return 'Rural Road';
  if (clean.includes('resid')) return 'Residential Road';
  return 'Urban Road';
};

const normalizeSeverity = (val?: string): AccidentSeverity => {
  if (!val) return 'Moderate';
  const clean = val.trim().toLowerCase();
  if (clean.includes('fatal')) return 'Fatal';
  if (clean.includes('sev')) return 'Severe';
  if (clean.includes('min')) return 'Minor';
  return 'Moderate';
};

const normalizeRiskLevel = (score: number, val?: string): RiskLevel => {
  if (val) {
    const clean = val.trim().toUpperCase();
    if (clean === 'HIGH') return 'HIGH';
    if (clean === 'MEDIUM') return 'MEDIUM';
    if (clean === 'LOW') return 'LOW';
  }
  if (score >= 70) return 'HIGH';
  if (score >= 35) return 'MEDIUM';
  return 'LOW';
};

/**
 * Parses and normalizes raw dataset records from roadsafe-accident-data.csv (rawDataset.json)
 */
const parseDataset = (rawRows: RawDatasetRecord[]): AccidentRecord[] => {
  return rawRows.map((row, idx) => {
    const id =
      row['Accident ID'] ||
      row['accident_id'] ||
      row['id'] ||
      `ACC-2024-${1000 + idx}`;

    const date = row['Date'] || row['date'] || '2024-06-15';
    const location =
      row['Location'] ||
      row['location'] ||
      'Vijayawada Central (Benz Circle)';

    const weather = normalizeWeather(row['Weather'] || row['weather']);
    const roadCondition = normalizeRoad(row['Road Condition'] || row['road_condition']);
    const lightCondition = normalizeLight(row['Light Condition'] || row['light_condition']);
    const timeOfDay = normalizeTime(row['Time of Day'] || row['time_of_day']);
    const trafficDensity = normalizeTraffic(row['Traffic Density'] || row['traffic_density']);

    const speedLimit = Number(
      row['Speed Limit (km/h)'] || row['speed_limit'] || 60
    );

    const vehicles = Number(
      row['Vehicles Involved'] || row['vehicles'] || 2
    );

    const roadType = normalizeRoadType(row['Road Type'] || row['road_type']);
    const severity = normalizeSeverity(row['Severity'] || row['severity']);

    const riskScore = Number(
      row['Risk Score'] || row['risk_score'] || 50
    );

    const riskLevel = normalizeRiskLevel(
      riskScore,
      row['Risk Level'] || row['risk_level']
    );

    // Map geo coordinates with slight jitter for unique canvas placement
    const geo = LOCATION_GEO_MAP[location] || {
      lat: 16.5062,
      lng: 80.6480,
      x: 50,
      y: 50,
    };

    const jitterX = ((idx % 7) - 3) * 1.2;
    const jitterY = ((idx % 5) - 2) * 1.2;

    return {
      id,
      date,
      location,
      weather,
      roadCondition,
      lightCondition,
      timeOfDay,
      trafficDensity,
      speedLimit: isNaN(speedLimit) ? 60 : speedLimit,
      vehicles: isNaN(vehicles) ? 2 : vehicles,
      roadType,
      severity,
      riskScore: isNaN(riskScore) ? 50 : riskScore,
      riskLevel,
      coordinates: {
        lat: geo.lat + jitterX * 0.003,
        lng: geo.lng + jitterY * 0.003,
        xPercent: Math.min(92, Math.max(8, geo.x + jitterX)),
        yPercent: Math.min(90, Math.max(10, geo.y + jitterY)),
      },
    };
  });
};

/**
 * SINGLE SOURCE OF TRUTH: Primary loaded and normalized dataset records
 */
export const ACCIDENT_RECORDS: AccidentRecord[] = parseDataset(
  rawDataset as RawDatasetRecord[]
);

/**
 * Dataset metadata for presentation and verification
 */
export const DATASET_METADATA = {
  totalRecords: ACCIDENT_RECORDS.length,
  fileName: 'roadsafe-accident-data.csv',
  sourceLabel: 'Dataset: Academic Demo Data',
  monitoredCorridors: new Set(ACCIDENT_RECORDS.map((r) => r.location)).size,
};

/**
 * Dynamically aggregates hotspots calculated purely from ACCIDENT_RECORDS
 */
export const getAggregatedHotspots = (): HotspotLocation[] => {
  // Group all records by location
  const locationGroups = new Map<string, AccidentRecord[]>();

  ACCIDENT_RECORDS.forEach((rec) => {
    const list = locationGroups.get(rec.location) || [];
    list.push(rec);
    locationGroups.set(rec.location, list);
  });

  const hotspots: HotspotLocation[] = [];
  let idx = 1;

  locationGroups.forEach((records, location) => {
    const count = records.length;
    const avgScore = Math.round(
      records.reduce((sum, r) => sum + r.riskScore, 0) / (count || 1)
    );

    // Most common weather from dataset
    const weatherCounts: Record<string, number> = {};
    records.forEach((r) => {
      weatherCounts[r.weather] = (weatherCounts[r.weather] || 0) + 1;
    });
    const mostCommonWeather =
      (Object.entries(weatherCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as WeatherCondition) ||
      'Clear';

    // Severities
    const fatalCount = records.filter((r) => r.severity === 'Fatal').length;
    const severeCount = records.filter((r) => r.severity === 'Severe').length;
    const moderateCount = records.filter((r) => r.severity === 'Moderate').length;

    let avgSeverity: AccidentSeverity = 'Moderate';
    if (fatalCount + severeCount >= count * 0.4) {
      avgSeverity = 'Severe';
    } else if (records.filter((r) => r.severity === 'Minor').length >= count * 0.5) {
      avgSeverity = 'Minor';
    }

    const riskLevel: RiskLevel =
      avgScore >= 70 ? 'HIGH' : avgScore >= 35 ? 'MEDIUM' : 'LOW';

    const geo = LOCATION_GEO_MAP[location] || {
      lat: 16.5062,
      lng: 80.6480,
      x: 50,
      y: 50,
    };

    const primaryRiskFactors = [
      'Heavy Night Congestion & Wet Surface',
      'High-Speed Corridor Merge Conflict',
      'Reduced Atmospheric Visibility & Fog',
      'Unsignalized High-Speed Intersection',
      'Dense Multi-Lane Commercial Traffic',
    ];

    hotspots.push({
      id: `HOTSPOT-${idx}`,
      location,
      accidentCount: count, // Exact actual count from the dataset
      mostCommonWeather,
      averageSeverity: avgSeverity,
      averageRiskScore: avgScore,
      riskLevel,
      xPercent: geo.x,
      yPercent: geo.y,
      fatalities: fatalCount,
      injuries: severeCount + moderateCount,
      primaryRiskFactor: primaryRiskFactors[idx % primaryRiskFactors.length],
    });

    idx++;
  });

  return hotspots;
};
