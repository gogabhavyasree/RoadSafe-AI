import React from 'react';
import { useDataset } from '../context/DatasetContext';
import { DataTable } from '../components/tables/DataTable';
import { Database, FileSpreadsheet } from 'lucide-react';

export const AccidentData: React.FC = () => {
  const { records, datasetInfo } = useDataset();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Data Warehouse Event Store
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Accident Data Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Search, multi-sort, and filter through all {records.length} accident records imported from the primary dataset.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>{datasetInfo.isSample ? 'Academic Sample' : 'Active Ingest'} ({datasetInfo.fileName || 'roadsafe-accident-data.csv'})</span>
        </div>
      </div>

      {/* Main Interactive Table */}
      <DataTable data={records} />
    </div>
  );
};
export default AccidentData;
