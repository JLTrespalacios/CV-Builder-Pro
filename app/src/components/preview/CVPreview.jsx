import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useCVStore } from '../../store/cvStore';
import ModernDark from '../../templates/ModernDark';
import MinimalWhite from '../../templates/MinimalWhite';
import CorporateBlue from '../../templates/CorporateBlue';
import TechGamer from '../../templates/TechGamer';
import AcademicAPA from '../../templates/AcademicAPA';
import IvyLeague from '../../templates/IvyLeague';
import SwissGrid from '../../templates/SwissGrid';
import ExecutiveGray from '../../templates/ExecutiveGray';

const TEMPLATES = {
  // Base Components
  'ModernDark': ModernDark,
  'MinimalWhite': MinimalWhite,
  'CorporateBlue': CorporateBlue,
  'TechGamer': TechGamer,
  'AcademicAPA': AcademicAPA,
  'IvyLeague': IvyLeague,
  'SwissGrid': SwissGrid,
  'ExecutiveGray': ExecutiveGray,

  // Specialized System (Role + Strategy)
  'CreativePulse': ModernDark,   // Layout asimétrico / Visual
  'FrontendVision': TechGamer,   // Grid moderno / Tech chips
  'BackendCore': MinimalWhite,   // Arquitectura clara / Minimal
  'UXFlow': SwissGrid,           // Timeline / Structured
  'FashionForm': IvyLeague,      // Editorial / Serif
  'ShowcasePro': TechGamer,      // Gallery / Grid
  'ATSSmart': MinimalWhite,      // Ultra Clean / ATS
  'SmartStart': CorporateBlue,   // Visual ligero / Fresh
  'SeniorPrestige': ExecutiveGray, // Logros / Executive
  'LeadershipPrime': ExecutiveGray, // Estrategia / Sobrio
  'HybridPro': TechGamer,        // Hybrid / Versatile
};

const A4_HEIGHT_PX = 1123; // Approx height of A4 at 96dpi (297mm)
const A4_MM = 297;

const CVPreview = forwardRef((props, ref) => {
  const { cvData, selectedTemplate, themeColor } = useCVStore();
  const TemplateComponent = TEMPLATES[selectedTemplate] || ModernDark;
  const [pages, setPages] = useState([1]);
  const containerRef = useRef(null);

  // Calculate pages based on content height
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        const pageCount = Math.ceil(Math.max(height, 1) / A4_HEIGHT_PX);
        const newPages = Array.from({ length: Math.max(pageCount, 1) }, (_, i) => i + 1);
        if (newPages.length !== pages.length) {
            setPages(newPages);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [cvData, selectedTemplate, pages.length]); // Re-calculate when data changes

  return (
    <div id="cv-print-content" className="w-full min-h-full relative print:overflow-visible">
      <div className="min-w-fit min-h-full flex flex-col items-center py-8 print:p-0">
        <div className="relative print:shadow-none">
          {/* Page Guidelines Overlay - Now styled as visual gaps */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 print:hidden">
             {pages.map((page) => (
                 <div 
                   key={page} 
                   className="absolute left-0 w-full border-b border-dashed border-slate-700/50"
                   style={{ 
                     top: `${page * 297}mm`,
                     height: '1px'
                   }}
                 >
                     <span className="absolute -top-3 -right-24 bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded shadow-sm border border-slate-700">
                        Página {page}
                     </span>
                 </div>
             ))}
          </div>

          <div 
            ref={ref}
            className="w-[210mm] min-h-[297mm] origin-top scale-100 transition-transform duration-200 print:w-[210mm] print:min-h-[297mm] print:scale-100 relative z-0"
            style={{
                background: 'repeating-linear-gradient(to bottom, #ffffff 0mm, #ffffff 297mm, transparent 297mm, transparent calc(297mm + 1px))',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)',
            }}
          >
            <div ref={containerRef}>
                 <TemplateComponent data={cvData} color={themeColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CVPreview;
