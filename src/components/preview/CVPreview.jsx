import React, { forwardRef } from 'react';
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
  'ModernDark': ModernDark,
  'MinimalWhite': MinimalWhite,
  'CorporateBlue': CorporateBlue,
  'TechGamer': TechGamer,
  'AcademicAPA': AcademicAPA,
  'IvyLeague': IvyLeague,
  'SwissGrid': SwissGrid,
  'ExecutiveGray': ExecutiveGray,
};

const CVPreview = forwardRef((props, ref) => {
  const { cvData, selectedTemplate, themeColor } = useCVStore();
  const TemplateComponent = TEMPLATES[selectedTemplate] || ModernDark;

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto flex justify-center p-8 print:p-0 print:bg-white print:overflow-visible">
      <div 
        ref={ref}
        className="bg-white shadow-2xl w-[210mm] min-h-[297mm] origin-top scale-100 transition-transform duration-200 print:shadow-none print:w-full print:min-h-0 print:scale-100"
      >
        <TemplateComponent data={cvData} color={themeColor} />
      </div>
    </div>
  );
});

export default CVPreview;
