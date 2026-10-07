import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { DatasetProvider } from './context/DatasetContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Prediction } from './pages/Prediction';
import { Analytics } from './pages/Analytics';
import { Hotspots } from './pages/Hotspots';
import { AccidentData } from './pages/AccidentData';
import { ModelPerformance } from './pages/ModelPerformance';
import { Workflow } from './pages/Workflow';
import { UploadDatasetPage } from './pages/UploadDatasetPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DatasetProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/upload" element={<UploadDatasetPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/predict" element={<Prediction />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/hotspots" element={<Hotspots />} />
                <Route path="/accidents" element={<AccidentData />} />
                <Route path="/model" element={<ModelPerformance />} />
                <Route path="/workflow" element={<Workflow />} />
                {/* Fallback to dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </DatasetProvider>
    </ThemeProvider>
  );
};

export default App;
