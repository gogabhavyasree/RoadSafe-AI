import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DisclaimerBanner } from '../ui/DisclaimerBanner';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Sidebar for all views */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-[padding] duration-300">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Global Academic Disclaimer on non-landing pages */}
        {!isLandingPage && (
          <div className="px-4 sm:px-6 pt-4 pb-0 max-w-7xl w-full mx-auto">
            <DisclaimerBanner compact />
          </div>
        )}

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
