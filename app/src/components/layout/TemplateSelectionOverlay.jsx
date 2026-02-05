import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileText, Download, Star, Sparkles, Briefcase, User, Layers, Search, CheckCircle2, Zap, LayoutTemplate } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { generateWord } from '../../utils/wordGenerator';
import { TRANSLATIONS } from '../../constants/translations';

// --- Configuration & Data ---

const FILTERS = {
  profiles: ['Todos', 'Junior', 'Senior', 'Ejecutivo'],
  industries: ['Todos', 'Tech', 'Corporativo', 'Creativo'],
  styles: ['Todos', 'Minimalista', 'Moderno', 'Clásico']
};

const templates = [
  { 
    id: 'MinimalWhite', 
    name: 'Budapest', 
    badge: 'Más elegido', 
    badgeColor: 'bg-emerald-500',
    tags: { profile: 'Junior', industry: 'Tech', style: 'Minimalista' },
    layout: 'minimal'
  },
  { 
    id: 'SwissGrid', 
    name: 'Chicago', 
    badge: 'Recomendado', 
    badgeColor: 'bg-amber-500',
    tags: { profile: 'Senior', industry: 'Creativo', style: 'Moderno' },
    layout: 'grid'
  },
  { 
    id: 'ExecutiveGray', 
    name: 'Rotterdam', 
    badge: 'Nuevo', 
    badgeColor: 'bg-blue-500',
    tags: { profile: 'Ejecutivo', industry: 'Corporativo', style: 'Clásico' },
    layout: 'sidebar'
  },
  { 
    id: 'CorporateBlue', 
    name: 'Riga', 
    tags: { profile: 'Senior', industry: 'Corporativo', style: 'Moderno' },
    layout: 'header-blue'
  },
  { 
    id: 'ModernDark', 
    name: 'Lima', 
    tags: { profile: 'Junior', industry: 'Tech', style: 'Moderno' },
    layout: 'dark'
  },
  { 
    id: 'IvyLeague', 
    name: 'Sydney', 
    tags: { profile: 'Ejecutivo', industry: 'Corporativo', style: 'Clásico' },
    layout: 'serif'
  },
  { 
    id: 'TechGamer', 
    name: 'Cali', 
    tags: { profile: 'Junior', industry: 'Creativo', style: 'Moderno' },
    layout: 'accent'
  },
  { 
    id: 'AcademicAPA', 
    name: 'Tokyo', 
    tags: { profile: 'Senior', industry: 'Corporativo', style: 'Clásico' },
    layout: 'academic'
  },
];

// --- Mini Preview Component ---

const MiniCVPreview = ({ layout }) => {
  // Common dummy text styles
  const textTitle = "bg-current opacity-80 h-1.5 w-1/3 mb-1 rounded-[1px]";
  const textBody = "bg-current opacity-40 h-1 w-full mb-0.5 rounded-[1px]";
  const textBodyShort = "bg-current opacity-40 h-1 w-2/3 mb-0.5 rounded-[1px]";
  
  const renderSection = (lines = 3) => (
    <div className="mb-2">
      <div className="bg-current opacity-20 h-1 w-1/4 mb-1 rounded-[1px]"></div>
      {Array(lines).fill(0).map((_, i) => (
        <div key={i} className={textBody}></div>
      ))}
    </div>
  );

  const renderContent = () => (
    <div className="flex-1 p-2 flex flex-col gap-2">
       {renderSection(2)}
       {renderSection(3)}
       {renderSection(2)}
    </div>
  );

  // Different Layout Implementations
  switch (layout) {
    case 'minimal': // Budapest
      return (
        <div className="w-full h-full bg-white text-slate-800 p-3 flex flex-col shadow-sm">
          <div className="mb-3 border-b border-slate-100 pb-1">
            <div className="h-2 w-1/2 bg-slate-800 mb-1"></div>
            <div className="h-1 w-1/3 bg-slate-400"></div>
          </div>
          {renderContent()}
        </div>
      );
    
    case 'grid': // Chicago
      return (
        <div className="w-full h-full bg-white text-slate-800 p-3 shadow-sm">
          <div className="mb-2">
            <div className="h-3 w-1/2 bg-red-600 mb-1"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="col-span-1 border-r border-slate-100 pr-1">
               {renderSection(4)}
            </div>
            <div className="col-span-2">
               {renderSection(3)}
               {renderSection(3)}
            </div>
          </div>
        </div>
      );

    case 'sidebar': // Rotterdam
      return (
        <div className="w-full h-full bg-white text-slate-800 flex shadow-sm">
          <div className="w-1/3 bg-slate-100 p-2 h-full">
            <div className="h-8 w-8 bg-slate-300 rounded-full mb-2 mx-auto"></div>
            {renderSection(4)}
          </div>
          <div className="w-2/3 p-2">
             <div className="h-2 w-2/3 bg-slate-700 mb-2"></div>
             {renderSection(3)}
             {renderSection(3)}
          </div>
        </div>
      );

    case 'header-blue': // Riga
      return (
        <div className="w-full h-full bg-white text-slate-800 shadow-sm flex flex-col">
          <div className="bg-blue-900 h-8 w-full mb-2"></div>
          <div className="px-2">
             {renderSection(3)}
             {renderSection(3)}
          </div>
        </div>
      );

    case 'dark': // Lima
      return (
        <div className="w-full h-full bg-slate-900 text-slate-300 p-3 shadow-sm">
           <div className="h-2 w-1/2 bg-white mb-2"></div>
           <div className="grid grid-cols-2 gap-2">
             <div>{renderSection(3)}</div>
             <div>{renderSection(3)}</div>
           </div>
        </div>
      );
      
    case 'serif': // Sydney
      return (
        <div className="w-full h-full bg-[#fdfbf7] text-slate-900 p-3 shadow-sm border-t-4 border-slate-900">
           <div className="h-2 w-1/2 bg-slate-900 mb-1 mx-auto"></div>
           <div className="h-[1px] w-full bg-slate-200 my-2"></div>
           <div className="flex gap-2">
             <div className="flex-1">{renderSection(4)}</div>
             <div className="flex-1">{renderSection(4)}</div>
           </div>
        </div>
      );

    case 'accent': // Cali
      return (
        <div className="w-full h-full bg-white text-slate-800 p-3 shadow-sm border-l-4 border-green-500">
           <div className="h-3 w-1/2 bg-black mb-2 text-white px-1"></div>
           {renderContent()}
        </div>
      );

    case 'academic': // Tokyo
      return (
        <div className="w-full h-full bg-white text-slate-800 p-3 shadow-sm">
           <div className="text-center mb-2">
              <div className="h-2 w-1/2 bg-slate-800 mx-auto mb-1"></div>
              <div className="h-1 w-1/3 bg-slate-400 mx-auto"></div>
           </div>
           <div className="text-[2px] text-justify">
             {renderSection(5)}
             {renderSection(5)}
           </div>
        </div>
      );

    default:
      return null;
  }
};


const TemplateSelectionOverlay = ({ onSelect, onClose, isModal = false }) => {
  const { setTemplate, cvData, language } = useCVStore();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const t = TRANSLATIONS[language];

  // Filter State
  const [activeProfile, setActiveProfile] = useState('Todos');
  const [activeIndustry, setActiveIndustry] = useState('Todos');
  const [activeStyle, setActiveStyle] = useState('Todos');

  // Filter Logic
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchProfile = activeProfile === 'Todos' || template.tags.profile === activeProfile;
      const matchIndustry = activeIndustry === 'Todos' || template.tags.industry === activeIndustry;
      const matchStyle = activeStyle === 'Todos' || template.tags.style === activeStyle;
      return matchProfile && matchIndustry && matchStyle;
    });
  }, [activeProfile, activeIndustry, activeStyle]);

  const handleSelect = (templateId) => {
    setTemplate(templateId);
    onSelect();
  };

  const handleDownloadSample = async (e, type, templateId) => {
    e.stopPropagation();
    if (type === 'word') {
      try {
        await generateWord(cvData, t);
      } catch (error) {
        console.error("Error generating word:", error);
      }
    } else {
      alert("Para descargar en PDF, selecciona la plantilla y usa el botón de descarga en el editor.");
    }
  };

  return (
    <div className={`w-full min-h-screen bg-slate-50 flex flex-col ${isModal ? 'fixed inset-0 z-50 overflow-y-auto' : 'relative'} font-sans`}>
      
      {/* Close Button (Modal Mode) */}
      {isModal && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:bg-slate-100 z-50 transition-colors"
        >
          <Zap size={24} className="text-slate-500" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Elige una plantilla diseñada para <span className="text-blue-600">conseguir entrevistas</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Cada diseño está pensado para destacar tu perfil, proyectar profesionalismo y superar filtros ATS utilizados por reclutadores.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500"
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Aprobadas por reclutadores</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <LayoutTemplate size={16} className="text-blue-500" />
              <span>Estructura profesional validada</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <Briefcase size={16} className="text-purple-500" />
              <span>Listas para procesos reales</span>
            </div>
          </motion.div>
        </div>

        {/* Filters Section */}
        <div className="mb-12 space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            
            {/* Filter Group: Profile */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <User size={14} /> Perfil
              </span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {FILTERS.profiles.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveProfile(filter)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeProfile === filter 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Industry */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Layers size={14} /> Industria
              </span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {FILTERS.industries.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveIndustry(filter)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeIndustry === filter 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

             {/* Filter Group: Style */}
             <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={14} /> Estilo
              </span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {FILTERS.styles.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveStyle(filter)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeStyle === filter 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Templates Grid */}
        <AnimatePresence mode='wait'>
          <motion.div 
            key={`${activeProfile}-${activeIndustry}-${activeStyle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  layoutId={template.id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  {/* Badge */}
                  {template.badge && (
                    <div className={`absolute top-0 right-0 ${template.badgeColor} text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-bl-xl z-20 shadow-sm tracking-wide`}>
                      {template.badge}
                    </div>
                  )}

                  {/* ATS Friendly Indicator */}
                  <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 size={12} /> ATS-Friendly
                    </div>
                  </div>

                  {/* Preview Area */}
                  <div className="relative aspect-[1/1.4] w-full bg-slate-50 overflow-hidden p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="w-full h-full shadow-sm rounded-sm overflow-hidden relative transform transition-transform duration-500 group-hover:scale-105 origin-top">
                       <MiniCVPreview layout={template.layout} />
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center transition-opacity duration-300 ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <button 
                        onClick={() => handleSelect(template.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mb-3"
                      >
                        <Sparkles size={18} />
                        Usar esta plantilla
                      </button>
                      <span className="text-white/80 text-xs font-medium">Click para editar</span>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-5 bg-white flex items-center justify-between border-t border-slate-100 mt-auto relative z-10">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{template.name}</h3>
                      <div className="flex gap-2 text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                         <span>{template.tags.profile}</span>
                         <span>•</span>
                         <span>{template.tags.style}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <div className="group/icon relative">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 cursor-help">
                           <FileText size={14} />
                        </div>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Word
                        </span>
                      </div>
                      <div className="group/icon relative">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100 cursor-help">
                           <FileText size={14} />
                        </div>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          PDF
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-slate-400" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-700 mb-2">No encontramos plantillas con esos filtros</h3>
                 <p className="text-slate-500">Prueba ajustando los criterios de búsqueda.</p>
                 <button 
                   onClick={() => { setActiveProfile('Todos'); setActiveIndustry('Todos'); setActiveStyle('Todos'); }}
                   className="mt-6 text-blue-600 font-bold hover:underline"
                 >
                   Limpiar filtros
                 </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default TemplateSelectionOverlay;
