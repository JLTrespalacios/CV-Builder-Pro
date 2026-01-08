import React, { useState, useRef, useEffect } from 'react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { LayoutTemplate, ChevronDown, Check } from 'lucide-react';

const templates = [
  { id: 'ModernDark', name: 'Dark', color: 'bg-slate-900' },
  { id: 'MinimalWhite', name: 'Minimal', color: 'bg-white border border-gray-300' },
  { id: 'CorporateBlue', name: 'Corporate', color: 'bg-blue-900' },
  { id: 'TechGamer', name: 'Neon', color: 'bg-black border border-green-500' },
  { id: 'AcademicAPA', name: 'Académico (APA)', color: 'bg-stone-100 border border-stone-300' },
  { id: 'IvyLeague', name: 'Ivy League', color: 'bg-white border-2 border-black' },
  { id: 'SwissGrid', name: 'Swiss Design', color: 'bg-red-600' },
  { id: 'ExecutiveGray', name: 'Executive', color: 'bg-gray-700' },
];

const PROFESSIONAL_COLORS = [
  { value: '#0f172a', name: 'Director Tech (Slate)', class: 'bg-slate-900' },
  { value: '#172554', name: 'CEO Navy (Azul Profundo)', class: 'bg-blue-950' },
  { value: '#111827', name: 'Boardroom (Negro Suave)', class: 'bg-gray-900' },
  { value: '#064e3b', name: 'Senior Management (Verde)', class: 'bg-emerald-900' },
  { value: '#7f1d1d', name: 'Executive Power (Vino)', class: 'bg-red-900' },
  { value: '#0e7490', name: 'Lead Developer (Cian)', class: 'bg-cyan-700' },
  { value: '#4338ca', name: 'Startup Founder (Indigo)', class: 'bg-indigo-700' },
  { value: '#4a044e', name: 'Visionary (Púrpura)', class: 'bg-fuchsia-950' },
  { value: '#ffffff', name: 'Clean Minimalist (Blanco)', class: 'bg-white' },
];

const TemplateSelector = () => {
  const { selectedTemplate, setTemplate, themeColor, setThemeColor, language } = useCVStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const t = TRANSLATIONS[language];

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];
  const currentColorName = PROFESSIONAL_COLORS.find(c => c.value === themeColor)?.name || t.custom;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setTemplate(id);
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm z-50 relative space-y-6 hover-card">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <LayoutTemplate size={20} />
          {t.template}
        </h3>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover-input"
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded ${currentTemplate.color}`}></div>
              <span className="font-medium text-slate-700">{currentTemplate.name}</span>
            </div>
            <ChevronDown size={18} className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelect(template.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors hover-list-item ${
                    selectedTemplate === template.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded ${template.color}`}></div>
                    <span className="font-medium">{template.name}</span>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border border-slate-300" style={{ backgroundColor: themeColor }}></span>
          {t.mainColor}
        </h3>
        <p className="text-sm text-slate-500 mb-3">{t.colorSelectionNote}</p>
        
        <div className="grid grid-cols-4 gap-3">
          {PROFESSIONAL_COLORS.map((color) => {
            const isWhite = color.value === '#ffffff';
            const isSelected = themeColor === color.value;
            
            return (
              <button
                key={color.value}
                onClick={() => setThemeColor(color.value)}
                className={`group relative w-full aspect-square rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover-btn ${
                  isSelected ? 'border-blue-600 shadow-md scale-105' : 'border-transparent hover:border-slate-300'
                } ${isWhite && !isSelected ? 'border-slate-200' : ''}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check size={20} className={`${isWhite ? 'text-slate-900' : 'text-white'} drop-shadow-md`} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-center">
             <p className="text-xs font-medium text-slate-600 bg-slate-100 py-1 px-2 rounded-full inline-block">
               {currentColorName}
             </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
