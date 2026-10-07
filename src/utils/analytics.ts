import { AccidentRecord, AccidentSeverity, RiskLevel, WeatherCondition, RoadSurface, TimeOfDay } from '../types';

export interface SeverityAggregate {
  name: AccidentSeverity;
  count: number;
  percentage: number;
  color: string;
}

export interface CategoryAggregate {
  name: string;
  count: number;
  highRiskCount: number;
  avgRiskScore: number;
}

export interface MonthlyAggregate {
  month: string;
  accidents: number;
  highRisk: number;
  avgRisk: number;
}

export const SEVERITY_COLORS: Record<AccidentSeverity, string> = {
  Minor: '#10B981', // emerald/green
  Moderate: '#3B82F6', // blue
  Severe: '#F59E0B', // amber
  Fatal: '#EF4444', // red
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  LOW: '#10B981',
  MEDIUM: '#F59E0B',
  HIGH: '#EF4444',
};

export const calculateDashboardKPIs = (records: AccidentRecord[]) => {
  const total = records.length;
  if (total === 0) {
    return {
      totalAccidents: 0,
      highRiskCases: 0,
      highRiskRate: 0,
      locationsMonitored: 0,
      averageRiskScore: 0,
      fatalCases: 0,
    };
  }

  const highRiskCases = records.filter((r) => r.riskLevel === 'HIGH').length;
  const fatalCases = records.filter((r) => r.severity === 'Fatal').length;
  const uniqueLocations = new Set(records.map((r) => r.location)).size;
  const avgRiskScore = Math.round(records.reduce((acc, r) => acc + r.riskScore, 0) / total);

  return {
    totalAccidents: total,
    highRiskCases,
    highRiskRate: Math.round((highRiskCases / total) * 100),
    locationsMonitored: uniqueLocations,
    averageRiskScore: avgRiskScore,
    fatalCases,
  };
};

export const aggregateBySeverity = (records: AccidentRecord[]): SeverityAggregate[] => {
  const counts: Record<AccidentSeverity, number> = {
    Minor: 0,
    Moderate: 0,
    Severe: 0,
    Fatal: 0,
  };

  records.forEach((r) => {
    if (counts[r.severity] !== undefined) {
      counts[r.severity]++;
    }
  });

  const total = records.length || 1;
  return (['Minor', 'Moderate', 'Severe', 'Fatal'] as AccidentSeverity[]).map((sev) => ({
    name: sev,
    count: counts[sev],
    percentage: Math.round((counts[sev] / total) * 100),
    color: SEVERITY_COLORS[sev],
  }));
};

export const aggregateByRiskLevel = (records: AccidentRecord[]) => {
  const counts = { LOW: 0, MEDIUM: 0, HIGH: 0 };
  records.forEach((r) => {
    counts[r.riskLevel] = (counts[r.riskLevel] || 0) + 1;
  });

  const total = records.length || 1;
  return [
    { name: 'Low Risk', value: counts.LOW, percentage: Math.round((counts.LOW / total) * 100), color: '#10B981' },
    { name: 'Medium Risk', value: counts.MEDIUM, percentage: Math.round((counts.MEDIUM / total) * 100), color: '#F59E0B' },
    { name: 'High Risk', value: counts.HIGH, percentage: Math.round((counts.HIGH / total) * 100), color: '#EF4444' },
  ];
};

export const aggregateByWeather = (records: AccidentRecord[]): CategoryAggregate[] => {
  const map = new Map<WeatherCondition, { count: number; highRisk: number; totalScore: number }>();
  const weathers: WeatherCondition[] = ['Clear', 'Rain', 'Fog', 'Snow', 'Other'];
  weathers.forEach((w) => map.set(w, { count: 0, highRisk: 0, totalScore: 0 }));

  records.forEach((r) => {
    const item = map.get(r.weather) || { count: 0, highRisk: 0, totalScore: 0 };
    item.count++;
    if (r.riskLevel === 'HIGH') item.highRisk++;
    item.totalScore += r.riskScore;
    map.set(r.weather, item);
  });

  return weathers.map((w) => {
    const data = map.get(w)!;
    return {
      name: w,
      count: data.count,
      highRiskCount: data.highRisk,
      avgRiskScore: data.count ? Math.round(data.totalScore / data.count) : 0,
    };
  });
};

export const aggregateByTime = (records: AccidentRecord[]): CategoryAggregate[] => {
  const times: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const map = new Map<TimeOfDay, { count: number; highRisk: number; totalScore: number }>();
  times.forEach((t) => map.set(t, { count: 0, highRisk: 0, totalScore: 0 }));

  records.forEach((r) => {
    const item = map.get(r.timeOfDay) || { count: 0, highRisk: 0, totalScore: 0 };
    item.count++;
    if (r.riskLevel === 'HIGH') item.highRisk++;
    item.totalScore += r.riskScore;
    map.set(r.timeOfDay, item);
  });

  return times.map((t) => {
    const data = map.get(t)!;
    return {
      name: t,
      count: data.count,
      highRiskCount: data.highRisk,
      avgRiskScore: data.count ? Math.round(data.totalScore / data.count) : 0,
    };
  });
};

export const aggregateByRoadCondition = (records: AccidentRecord[]): CategoryAggregate[] => {
  const conditions: RoadSurface[] = ['Dry', 'Wet', 'Snow/Ice', 'Flood'];
  const map = new Map<RoadSurface, { count: number; highRisk: number; totalScore: number }>();
  conditions.forEach((c) => map.set(c, { count: 0, highRisk: 0, totalScore: 0 }));

  records.forEach((r) => {
    const item = map.get(r.roadCondition) || { count: 0, highRisk: 0, totalScore: 0 };
    item.count++;
    if (r.riskLevel === 'HIGH') item.highRisk++;
    item.totalScore += r.riskScore;
    map.set(r.roadCondition, item);
  });

  return conditions.map((c) => {
    const data = map.get(c)!;
    return {
      name: c,
      count: data.count,
      highRiskCount: data.highRisk,
      avgRiskScore: data.count ? Math.round(data.totalScore / data.count) : 0,
    };
  });
};

export const aggregateMonthlyTrend = (records: AccidentRecord[]): MonthlyAggregate[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData: Record<number, { count: number; highRisk: number; totalRisk: number }> = {};

  for (let i = 0; i < 12; i++) {
    monthlyData[i] = { count: 0, highRisk: 0, totalRisk: 0 };
  }

  records.forEach((r) => {
    const date = new Date(r.date);
    if (!isNaN(date.getTime())) {
      const m = date.getMonth();
      if (monthlyData[m]) {
        monthlyData[m].count++;
        if (r.riskLevel === 'HIGH') monthlyData[m].highRisk++;
        monthlyData[m].totalRisk += r.riskScore;
      }
    }
  });

  return months.map((month, idx) => {
    const d = monthlyData[idx];
    return {
      month,
      accidents: d.count,
      highRisk: d.highRisk,
      avgRisk: d.count > 0 ? Math.round(d.totalRisk / d.count) : 0,
    };
  });
};

export const aggregateVehicleInvolvement = (records: AccidentRecord[]) => {
  const bins = [
    { label: 'Single Vehicle (1)', min: 1, max: 1 },
    { label: 'Two Vehicles (2)', min: 2, max: 2 },
    { label: 'Multi-Vehicle (3-4)', min: 3, max: 4 },
    { label: 'Pileup (5+)', min: 5, max: 20 },
  ];

  return bins.map((bin) => {
    const matching = records.filter((r) => r.vehicles >= bin.min && r.vehicles <= bin.max);
    const count = matching.length;
    const severeCount = matching.filter((r) => r.severity === 'Severe' || r.severity === 'Fatal').length;
    return {
      category: bin.label,
      totalCount: count,
      severeCount,
      percentageOfTotal: records.length ? Math.round((count / records.length) * 100) : 0,
    };
  });
};

export const generateDynamicInsights = (records: AccidentRecord[]) => {
  if (records.length === 0) return [];

  // 1. Time insight
  const nightAccidents = records.filter((r) => r.timeOfDay === 'Night');
  const nightSeverePct = nightAccidents.length
    ? Math.round((nightAccidents.filter((r) => r.severity === 'Severe' || r.severity === 'Fatal').length / nightAccidents.length) * 100)
    : 0;

  // 2. Weather insight
  const wetAccidents = records.filter((r) => r.roadCondition === 'Wet' || r.roadCondition === 'Flood');
  const wetAvgScore = wetAccidents.length
    ? Math.round(wetAccidents.reduce((acc, r) => acc + r.riskScore, 0) / wetAccidents.length)
    : 0;

  // 3. Traffic insight
  const highTraffic = records.filter((r) => r.trafficDensity === 'High');
  const highTrafficHighRiskPct = highTraffic.length
    ? Math.round((highTraffic.filter((r) => r.riskLevel === 'HIGH').length / highTraffic.length) * 100)
    : 0;

  return [
    {
      id: 'insight-1',
      type: 'warning',
      badge: 'Temporal Risk Pattern',
      title: 'Night-Time Severity Surge',
      description: `${nightSeverePct}% of recorded night-time incidents resulted in severe or fatal outcomes due to visual degradation and speed variation.`,
      stat: `${nightAccidents.length} Night Cases`,
    },
    {
      id: 'insight-2',
      type: 'info',
      badge: 'Frictional Surface Risk',
      title: 'Wet Pavement Friction Loss',
      description: `Precipitation-affected roadways average an elevated risk index of ${wetAvgScore}/100 across the active dataset.`,
      stat: `${wetAccidents.length} Wet Surface Incidents`,
    },
    {
      id: 'insight-3',
      type: 'danger',
      badge: 'Congestion Impact',
      title: 'High Density Conflict Zones',
      description: `High-density corridors exhibit a ${highTrafficHighRiskPct}% probability of high-risk classification during peak operating windows.`,
      stat: `${highTraffic.length} Heavy Traffic Records`,
    },
  ];
};
