import React, { useRef, useState } from 'react';
import { UploadCloud, FileSpreadsheet, Database, Loader2, ShieldAlert } from 'lucide-react';
import { useDataset } from '../../context/DatasetContext';
import { useToast } from '../../context/ToastContext';

interface DragDropZoneProps {
  onSuccess?: () => void;
}

export const DragDropZone: React.FC<DragDropZoneProps> = ({ onSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { uploadCsvContent, loadSampleDataset, isProcessing } = useDataset();
  const { showToast } = useToast();

  const handleFileProcess = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      showToast('Invalid File Type', 'Please upload a valid .CSV road accident dataset.', 'error');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showToast('File Too Large', 'Maximum supported file size is 15MB.', 'error');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        if (!text) {
          showToast('Empty File', 'Uploaded CSV contains no records.', 'error');
          return;
        }

        const success = await uploadCsvContent(file.name, file.size, text);
        if (success) {
          showToast('Road Dataset Ingested', `Successfully normalized "${file.name}" into warehouse memory.`, 'success');
          if (onSuccess) onSuccess();
        } else {
          showToast('ETL Parsing Failed', 'Could not parse road accident records. Check column schema.', 'error');
        }
      };
      reader.readAsText(file);
    } catch (err) {
      showToast('Error', 'Failed to read uploaded file buffer.', 'error');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileProcess(file);
      e.target.value = '';
    }
  };

  const handleLoadSample = () => {
    loadSampleDataset();
    showToast('Verified Sample Loaded', 'Ingested 180 verified municipal accident telemetry vectors.', 'success');
    if (onSuccess) onSuccess();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-14 text-center ${
        isDragOver
          ? 'border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-500/15 scale-[1.005]'
          : 'border-slate-800 hover:border-cyan-500/40 bg-[#091124]/70 dark:bg-[#091124]/80'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleInputChange}
        disabled={isProcessing}
      />

      {/* Glowing Electric Cyan Icon Container */}
      <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/15 transition-transform duration-300 hover:scale-105">
          {isProcessing ? (
            <Loader2 className="w-9 h-9 text-cyan-400 animate-spin" />
          ) : (
            <UploadCloud className="w-9 h-9 text-cyan-400" />
          )}
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
        Drag & Drop Accident Telemetry Dataset Here
      </h3>

      {/* Description tailored to RoadSafe AI */}
      <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
        Ingest historical traffic incident CSV datasets containing Date, Time, Junction Corridor,
        Weather Hazards, Surface Friction, Lighting, Speed Limit, and Casualty Severity.
      </p>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-white" />
          <span>Choose CSV File</span>
        </button>

        <button
          type="button"
          onClick={handleLoadSample}
          disabled={isProcessing}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-500/40 font-semibold text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Load Sample Dataset (180 Rows)</span>
        </button>
      </div>

      {/* Footer Constraint Note */}
      <p className="text-xs text-slate-500">
        Supports .CSV files up to 15MB • Client-side sandboxed parsing with zero telemetry leakage
      </p>
    </div>
  );
};
