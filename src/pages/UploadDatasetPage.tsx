import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  RotateCcw,
  LayoutDashboard,
  MapPin,
  CheckCircle2,
  Sparkles,
  Shield,
  Activity,
} from 'lucide-react';
import { useDataset } from '../context/DatasetContext';
import { useToast } from '../context/ToastContext';
import { DragDropZone } from '../components/upload/DragDropZone';
import { DatasetStatsGrid } from '../components/upload/DatasetStatsGrid';
import { PreprocessingLog } from '../components/upload/PreprocessingLog';
import { DatasetPreviewTable } from '../components/upload/DatasetPreviewTable';

export const UploadDatasetPage: React.FC = () => {
  const navigate = useNavigate();
  const { datasetInfo, records, downloadCleanedCSV, loadSampleDataset } = useDataset();
  const { showToast } = useToast();

  const handleDownload = () => {
    downloadCleanedCSV();
    showToast('Download Started', 'Cleaned road safety dataset CSV export generated.', 'success');
  };

  const handleReset = () => {
    loadSampleDataset();
    showToast('Dataset Reset', 'Restored verified academic sample dataset (180 rows).', 'info');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Top Header with Electric Cyan / Blue Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Shield className="w-3.5 h-3.5" />
            ROAD TELEMETRY & ML INGESTION
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Activity className="w-3.5 h-3.5" />
            CORRIDOR HAZARD PIPELINE
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Dataset Upload & Processing
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1 leading-relaxed">
            Upload real-world road accident CSV records, run automated preprocessing, and train custom
            risk prediction models.
          </p>
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <DragDropZone />

      {/* Active Dataset Ingestion Bar */}
      {records.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#091124]/80 border border-cyan-500/30 shadow-xl shadow-cyan-500/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {datasetInfo.fileName || 'roadsafe-accident-data.csv'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                  {datasetInfo.isSample ? 'SAMPLE ACTIVE' : 'USER UPLOAD ACTIVE'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {records.length} records ingested • {datasetInfo.columnsCount} features mapped • Updated {datasetInfo.uploadedAt}
              </p>
            </div>
          </div>

          {/* Action CTAs in Electric Cyan & Charcoal */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Analyze in Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/hotspots')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Hotspots</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:border-slate-600 text-xs font-semibold transition-all cursor-pointer"
              title="Download normalized CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 hover:border-slate-600 text-xs font-semibold transition-all cursor-pointer"
              title="Reset to 180 verified records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* Dataset Statistics Grid */}
      <DatasetStatsGrid />

      {/* Automated Preprocessing Execution Log */}
      <PreprocessingLog />

      {/* Ingested Dataset Preview Table */}
      <DatasetPreviewTable />
    </div>
  );
};
export default UploadDatasetPage;
