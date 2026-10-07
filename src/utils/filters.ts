import { AccidentRecord, AnalyticsFilterState } from '../types';

export const filterAccidents = (
  records: AccidentRecord[],
  filters: Partial<AnalyticsFilterState>
): AccidentRecord[] => {
  return records.filter((record) => {
    // Date filter
    if (filters.startDate && record.date < filters.startDate) return false;
    if (filters.endDate && record.date > filters.endDate) return false;

    // Weather filter
    if (filters.weather && filters.weather !== 'ALL' && record.weather !== filters.weather) {
      return false;
    }

    // Severity filter
    if (filters.severity && filters.severity !== 'ALL' && record.severity !== filters.severity) {
      return false;
    }

    // Location filter
    if (filters.location && filters.location !== 'ALL' && !record.location.includes(filters.location)) {
      return false;
    }

    // Road Condition filter
    if (filters.roadCondition && filters.roadCondition !== 'ALL' && record.roadCondition !== filters.roadCondition) {
      return false;
    }

    // Risk level filter
    if (filters.riskLevel && filters.riskLevel !== 'ALL' && record.riskLevel !== filters.riskLevel) {
      return false;
    }

    return true;
  });
};

export const searchAccidents = (records: AccidentRecord[], query: string): AccidentRecord[] => {
  if (!query || query.trim() === '') return records;
  const q = query.toLowerCase().trim();

  return records.filter(
    (r) =>
      r.id.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.weather.toLowerCase().includes(q) ||
      r.severity.toLowerCase().includes(q) ||
      r.roadType.toLowerCase().includes(q) ||
      r.riskLevel.toLowerCase().includes(q)
  );
};

export type SortField = 'date' | 'severity' | 'vehicles' | 'riskScore' | 'id';
export type SortOrder = 'asc' | 'desc';

const SEVERITY_WEIGHT: Record<string, number> = {
  Minor: 1,
  Moderate: 2,
  Severe: 3,
  Fatal: 4,
};

export const sortAccidents = (
  records: AccidentRecord[],
  field: SortField,
  order: SortOrder
): AccidentRecord[] => {
  const sorted = [...records];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'severity':
        comparison = (SEVERITY_WEIGHT[a.severity] || 0) - (SEVERITY_WEIGHT[b.severity] || 0);
        break;
      case 'vehicles':
        comparison = a.vehicles - b.vehicles;
        break;
      case 'riskScore':
        comparison = a.riskScore - b.riskScore;
        break;
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};
