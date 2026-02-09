import React from 'react';

export default function CVPage({ children, pageNumber }) {
  return (
    <div className="cv-page flex flex-col items-center">
      <div 
        className="bg-white p-0 text-gray-900 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] print:shadow-none transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col"
        style={{
          width: '210mm',
          minHeight: '297mm',
          position: 'relative',
        }}
      >
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>
      </div>

      <span className="mt-4 text-[10px] font-medium tracking-widest text-slate-500/50 uppercase print:hidden select-none">
        Página {pageNumber}
      </span>
    </div>
  );
}
