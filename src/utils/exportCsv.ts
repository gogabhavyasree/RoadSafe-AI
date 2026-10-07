import { AccidentRecord } from '../types';

export const exportToCSV = (records: AccidentRecord[], filename: string = 'roadsafe-accident-data.csv'): boolean => {
  if (!records || records.length === 0) return false;

  const headers = [
    'Accident ID',
    'Date',
    'Location',
    'Weather',
    'Road Condition',
    'Light Condition',
    'Time of Day',
    'Traffic Density',
    'Speed Limit (km/h)',
    'Vehicles Involved',
    'Road Type',
    'Severity',
    'Risk Score',
    'Risk Level',
  ];

  const escapeField = (val: unknown): string => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = records.map((r) => [
    r.id,
    r.date,
    r.location,
    r.weather,
    r.roadCondition,
    r.lightCondition,
    r.timeOfDay,
    r.trafficDensity,
    r.speedLimit,
    r.vehicles,
    r.roadType,
    r.severity,
    r.riskScore,
    r.riskLevel,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map(escapeField).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
};
