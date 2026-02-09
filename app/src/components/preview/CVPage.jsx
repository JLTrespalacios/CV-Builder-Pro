import React from 'react';

export default function CVPage({ children, pageNumber }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="bg-white p-0 text-gray-900 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] print:shadow-none transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        style={{
          width: '210mm',
          minHeight: '297mm',
          height: '297mm',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="h-full w-full">
          {children}
        </div>
      </div>

      <span className="mt-4 text-[10px] font-medium tracking-widest text-slate-500/50 uppercase print:hidden select-none">
        Página {pageNumber}
      </span>
    </div>
  );
}
