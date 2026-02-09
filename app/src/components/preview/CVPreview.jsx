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
import CVPage from './CVPage';

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

const CVPreview = forwardRef((props, ref) => {
  const { cvData, selectedTemplate, themeColor } = useCVStore();
  const TemplateComponent = TEMPLATES[selectedTemplate] || ModernDark;
  const [pages, setPages] = useState([1]);
  const containerRef = useRef(null);

  // Calculate pages based on content height (logic preserved for future split)
  // For now, we render everything in one "Page" wrapper but visually it will look correct
  // because the CVPage component has min-height and proper styling.
  // The 'repeating-linear-gradient' trick is now replaced by the actual CVPage component structure.
  // If the content is longer than one page, we might need to simulate the split visual or just let it grow.
  // Given the user's request for "CVPage" structure, we will wrap the template in a single CVPage for now,
  // as splitting content is a complex next step.
  
  return (
    <div 
      id="cv-print-content" 
      className="h-full w-full overflow-y-auto overflow-x-hidden flex justify-center py-12 bg-[radial-gradient(circle_at_top,_#1a1f3c,_#0b1020)] print:bg-white print:block print:h-auto print:overflow-visible print:py-0 custom-scrollbar"
    >
      <div className="flex flex-col gap-12 pb-32 print:block print:gap-0 print:pb-0 transform scale-100 origin-top">
        {/* Currently treating the whole CV as one continuous visual block wrapped in the page style */}
        {/* In the future, 'pages.map' would render distinct slices of content */}
        <CVPage pageNumber={1}>
          <div ref={ref} className="print:w-full">
             <TemplateComponent data={cvData} color={themeColor} />
          </div>
        </CVPage>
      </div>
    </div>
  );
});

export default CVPreview;
