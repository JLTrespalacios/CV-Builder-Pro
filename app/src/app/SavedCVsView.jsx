import React from 'react';
import { useCVStore } from '../store/cvStore';
import { useUIStore } from '../store/uiStore';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import BackgroundAmbience from '../components/layout/BackgroundAmbience';
import CVPreview from '../components/preview/CVPreview';
import SavedCVsPanel from '../components/editor/SavedCVsPanel';

const SavedCVsView = () => {
  const { isSidebarOpen, language } = useCVStore();
  const { appTheme } = useUIStore();
  
  const handlePrint = () => window.print();

  return (
    <div className="flex h-screen bg-[var(--bg-app)] text-[var(--text-main)] font-sans overflow-hidden transition-colors duration-300 relative selection:bg-indigo-500/30" data-theme={appTheme}>
      <BackgroundAmbience />
      <Sidebar onPrint={handlePrint} />
      
      <main className="flex-1 flex flex-col h-full transition-all duration-300 relative z-10">
         <Header />
         
         <div className="flex-1 overflow-hidden relative flex flex-col lg:flex-row pt-16">
            {/* Saved CVs Panel */}
            <div className={`h-full overflow-y-auto custom-scrollbar p-6 pb-24 lg:pb-6 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)]/30 backdrop-blur-sm flex justify-center transition-all duration-300 ${isSidebarOpen ? 'w-full lg:w-1/2' : 'w-0 p-0 overflow-hidden border-none'}`}>
                 <div className="w-full max-w-xl">
                    <SavedCVsPanel />
                 </div>
            </div>

             {/* Preview Section */}
            <div className={`hidden lg:block h-full bg-[var(--bg-app)]/50 relative overflow-hidden flex items-center justify-center p-8 transition-all duration-300 ${isSidebarOpen ? 'w-1/2' : 'w-full'}`}>
                <div className="h-full w-full max-w-[21cm] shadow-2xl rounded-sm overflow-hidden bg-white transform transition-transform duration-300 origin-top">
                   <CVPreview />
                </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default SavedCVsView;