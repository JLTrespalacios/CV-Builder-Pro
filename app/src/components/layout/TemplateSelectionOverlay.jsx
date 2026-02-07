import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, Download, Star, Sparkles, Briefcase, User, Layers, Search, CheckCircle2, Zap, LayoutTemplate, Code, Palette, Monitor, ArrowLeft } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
// import { generatePDF } from '../../utils/pdfGenerator';
// import { generateWord } from '../../utils/wordGenerator';
import { TRANSLATIONS } from '../../constants/translations';
import { getRoleData } from '../../constants/roleData';
import BackgroundAmbience from './BackgroundAmbience';

import { TEMPLATE_CONFIG } from '../../constants/templatesConfig';

// --- Configuration & Data ---

const FILTERS = {
  profiles: ['Todos', 'Tech', 'Creative', 'General'],
  roles: ['Todos', 'Frontend', 'Backend', 'Full Stack', 'Data', 'Diseño Gráfico', 'UX/UI', 'Fashion', 'Junior', 'Senior', 'Lead'],
  levels: ['Todos', 'Junior', 'Senior', 'Lead'],
  styles: ['Todos', 'Minimalista', 'Moderno', 'Creativo', 'Clásico']
};

const templates = TEMPLATE_CONFIG.map(t => ({
  ...t,
  // Map config fields to UI expected fields
  tags: {
    profile: t.category,
    role: Array.isArray(t.role) ? t.role.join(', ') : t.role,
    level: t.level
  },
  layout: t.layout_type,
  shortDesc: t.design_identity,
  // Ensure roles array is accessible for logic
  roles: Array.isArray(t.role) ? t.role : [t.role]
}));


// --- Mini Preview Component ---

const MiniCVPreview = ({ template }) => {
  const { layout, colorHex, id } = template;
  
  // Default colors if not specified
  const colors = colorHex || { primary: '#1e293b', secondary: '#ffffff', accent: '#3b82f6' };
  
  // Common styles
  const textTitle = { backgroundColor: colors.primary, opacity: 0.8, height: '6px', width: '40%', marginBottom: '4px', borderRadius: '1px' };
  const textBody = { backgroundColor: colors.primary, opacity: 0.4, height: '4px', width: '100%', marginBottom: '2px', borderRadius: '1px' };
  // const accentBox = { backgroundColor: colors.accent };
  
  const renderSection = (lines = 3, width = "100%") => (
    <div className="mb-2" style={{ width }}>
      <div style={{ ...textTitle, width: '25%', opacity: 0.6 }}></div>
      {Array(lines).fill(0).map((_, i) => (
        <div key={i} style={textBody}></div>
      ))}
    </div>
  );

  // --- Specific Template Renderers ---

  // 1. Creative Pulse (Asymmetric)
  if (id === 'CreativePulse') {
    return (
      <div className="w-full h-full p-3 shadow-sm flex flex-col relative overflow-hidden" style={{ background: colors.secondary }}>
         <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20" style={{ background: colors.accent }}></div>
         <div className="flex gap-2 z-10">
            <div className="w-1/3 pt-4">
               <div className="w-10 h-10 rounded-full mb-2" style={{ background: colors.accent }}></div>
               {renderSection(2)}
            </div>
            <div className="w-2/3 pt-8">
               <div className="h-2 w-3/4 mb-3" style={{ background: colors.primary }}></div>
               {renderSection(3)}
               <div className="grid grid-cols-2 gap-1 mt-2">
                  <div className="h-12 rounded bg-white shadow-sm"></div>
                  <div className="h-12 rounded bg-white shadow-sm"></div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // 2. Frontend Vision (Grid Moderno)
  if (id === 'FrontendVision') {
    return (
      <div className="w-full h-full bg-white p-3 shadow-sm flex flex-col">
         <div className="flex justify-between items-center mb-3 border-b pb-2" style={{ borderColor: colors.secondary }}>
            <div className="h-3 w-1/2" style={{ background: colors.primary }}></div>
            <div className="flex gap-1">
               {[1,2,3].map(i => <div key={i} className="w-3 h-3 rounded-sm" style={{ background: colors.accent, opacity: 0.5 }}></div>)}
            </div>
         </div>
         <div className="grid grid-cols-2 gap-2 h-full">
            <div className="bg-slate-50 p-1 rounded">
               {renderSection(3)}
            </div>
            <div className="bg-slate-50 p-1 rounded">
               {renderSection(3)}
            </div>
            <div className="col-span-2">
               <div className="flex gap-1 mb-1">
                  {[1,2,3,4].map(i => <div key={i} className="h-1 w-6 rounded-full" style={{ background: colors.accent }}></div>)}
               </div>
               {renderSection(2)}
            </div>
         </div>
      </div>
    );
  }

  // 3. Backend Core (Minimal Tech)
  if (id === 'BackendCore') {
    return (
      <div className="w-full h-full p-3 shadow-sm flex flex-col" style={{ background: colors.primary }}>
         <div className="h-2 w-1/3 mb-4" style={{ background: colors.secondary }}></div>
         <div className="space-y-2">
            <div className="p-2 border-l-2 bg-opacity-10 bg-white" style={{ borderColor: colors.secondary }}>
               <div className="h-1 w-full bg-slate-400 mb-1"></div>
               <div className="h-1 w-2/3 bg-slate-500"></div>
            </div>
            <div className="p-2 border-l-2 bg-opacity-10 bg-white" style={{ borderColor: colors.secondary }}>
               <div className="h-1 w-full bg-slate-400 mb-1"></div>
               <div className="h-1 w-2/3 bg-slate-500"></div>
            </div>
         </div>
      </div>
    );
  }

  // 4. UX Flow (Timeline)
  if (id === 'UXFlow') {
    return (
      <div className="w-full h-full bg-white flex shadow-sm">
         <div className="w-1/4 h-full" style={{ background: colors.primary }}></div>
         <div className="w-3/4 p-3 flex flex-col relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-100 ml-2"></div>
            <div className="ml-4 mb-2">
               <div className="h-2 w-1/2 mb-1" style={{ background: colors.secondary }}></div>
               {renderSection(2)}
            </div>
            <div className="ml-4 mb-2">
               <div className="h-2 w-1/2 mb-1" style={{ background: colors.secondary }}></div>
               {renderSection(2)}
            </div>
         </div>
      </div>
    );
  }

  // 5. Fashion Form (Editorial)
  if (id === 'FashionForm') {
    return (
      <div className="w-full h-full p-4 shadow-sm flex flex-col items-center text-center" style={{ background: colors.secondary }}>
         <div className="w-16 h-16 bg-slate-200 mb-3 grayscale"></div>
         <div className="h-3 w-3/4 mb-1 font-serif" style={{ background: colors.primary }}></div>
         <div className="h-[1px] w-10 my-2" style={{ background: colors.accent }}></div>
         <div className="text-left w-full mt-2 columns-2 gap-2">
             <div className="h-1 w-full bg-slate-400 mb-1"></div>
             <div className="h-1 w-full bg-slate-400 mb-1"></div>
             <div className="h-1 w-full bg-slate-400 mb-1"></div>
             <div className="h-1 w-full bg-slate-400 mb-1"></div>
         </div>
      </div>
    );
  }

  // 6. Showcase Pro (Gallery/Visual)
  if (id === 'ShowcasePro') {
    return (
      <div className="w-full h-full bg-white p-2 shadow-sm flex flex-col">
         <div className="flex items-center gap-2 mb-3 border-b pb-2" style={{ borderColor: colors.secondary }}>
            <div className="w-8 h-8 rounded-md" style={{ background: colors.accent }}></div>
            <div className="flex-1">
               <div className="h-2 w-1/2 mb-1" style={{ background: colors.primary }}></div>
               <div className="h-1 w-1/3 bg-slate-400"></div>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-2 flex-1">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-slate-50 rounded p-1 border border-slate-100 flex flex-col justify-end h-12">
                 <div className="h-1 w-2/3 mb-1" style={{ background: colors.primary, opacity: 0.5 }}></div>
              </div>
            ))}
         </div>
      </div>
    );
  }

  // 7. ATS Smart (Ultra Clean)
  if (id === 'ATSSmart') {
    return (
      <div className="w-full h-full bg-white p-3 shadow-sm flex flex-col text-xs">
         <div className="text-center mb-3 border-b border-black pb-1">
            <div className="h-2 w-1/2 mx-auto mb-1 bg-black"></div>
            <div className="h-1 w-1/3 mx-auto bg-slate-500"></div>
         </div>
         <div className="space-y-2">
            {[1,2,3].map(i => (
               <div key={i}>
                  <div className="h-1 w-1/4 mb-1 bg-black font-bold"></div>
                  <div className="h-1 w-full bg-slate-600 mb-0.5"></div>
                  <div className="h-1 w-full bg-slate-600 mb-0.5"></div>
                  <div className="h-1 w-3/4 bg-slate-600"></div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // 8. Smart Start (Junior/Visual)
  if (id === 'SmartStart') {
    return (
      <div className="w-full h-full bg-white flex shadow-sm border-t-4" style={{ borderColor: colors.accent }}>
         <div className="w-1/3 p-2 bg-slate-50 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full mb-2" style={{ background: colors.secondary }}></div>
            <div className="w-full space-y-1">
               <div className="h-1 w-full bg-slate-300 rounded"></div>
               <div className="h-1 w-full bg-slate-300 rounded"></div>
            </div>
         </div>
         <div className="w-2/3 p-2">
            <div className="h-2 w-3/4 mb-2" style={{ background: colors.primary }}></div>
            <div className="space-y-2">
               <div className="p-1 rounded bg-slate-50 border border-slate-100">
                  <div className="h-1 w-1/2 mb-1" style={{ background: colors.accent }}></div>
                  <div className="h-1 w-full bg-slate-400"></div>
               </div>
               <div className="p-1 rounded bg-slate-50 border border-slate-100">
                  <div className="h-1 w-1/2 mb-1" style={{ background: colors.accent }}></div>
                  <div className="h-1 w-full bg-slate-400"></div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // 9. Senior Prestige (Metrics/Executive)
  if (id === 'SeniorPrestige') {
    return (
      <div className="w-full h-full bg-white shadow-sm flex flex-col">
         <div className="h-10 w-full text-white p-2 flex items-center justify-between" style={{ background: colors.primary }}>
             <div className="h-2 w-1/3 bg-white opacity-90"></div>
             <div className="h-6 w-6 rounded bg-white opacity-20"></div>
         </div>
         <div className="p-2">
            <div className="flex justify-between mb-2 pb-2 border-b border-slate-100">
               <div className="text-center w-1/3">
                  <div className="h-2 w-full mb-1 font-bold" style={{ color: colors.primary }}>$$$</div>
                  <div className="h-1 w-full bg-slate-300"></div>
               </div>
               <div className="text-center w-1/3 border-l border-slate-100 pl-1">
                  <div className="h-2 w-full mb-1 font-bold" style={{ color: colors.primary }}>%%%</div>
                  <div className="h-1 w-full bg-slate-300"></div>
               </div>
            </div>
            {renderSection(3)}
         </div>
      </div>
    );
  }

  // 10. Leadership Prime (Strategic)
  if (id === 'LeadershipPrime') {
    return (
      <div className="w-full h-full bg-white shadow-sm p-3 border-l-8" style={{ borderColor: colors.secondary }}>
         <div className="flex justify-between items-end mb-4 border-b pb-2" style={{ borderColor: colors.secondary }}>
            <div className="w-2/3">
               <div className="h-3 w-full mb-1" style={{ background: colors.primary }}></div>
               <div className="h-1 w-1/2 bg-slate-500"></div>
            </div>
            <div className="h-8 w-8 rounded-sm" style={{ background: colors.secondary }}></div>
         </div>
         <div className="space-y-3">
             <div>
                <div className="h-1 w-1/4 mb-1 uppercase tracking-widest" style={{ background: colors.secondary }}></div>
                <div className="h-1 w-full bg-slate-400 mb-1"></div>
                <div className="h-1 w-full bg-slate-400"></div>
             </div>
             <div>
                <div className="h-1 w-1/4 mb-1 uppercase tracking-widest" style={{ background: colors.secondary }}></div>
                <div className="h-1 w-full bg-slate-400"></div>
             </div>
         </div>
      </div>
    );
  }

  // 11. Hybrid Pro (Versatile)
  if (id === 'HybridPro') {
    return (
      <div className="w-full h-full bg-white p-3 shadow-sm flex flex-col">
         <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: colors.secondary }}></div>
            <div className="flex-1 flex flex-col justify-center">
               <div className="h-2 w-1/2 mb-1" style={{ background: colors.primary }}></div>
               <div className="flex gap-1">
                  <div className="h-1 w-4 rounded-full" style={{ background: colors.secondary }}></div>
                  <div className="h-1 w-4 rounded-full" style={{ background: colors.secondary }}></div>
               </div>
            </div>
         </div>
         <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
               {renderSection(2)}
               {renderSection(2)}
            </div>
            <div className="col-span-1 bg-slate-50 rounded p-1">
               <div className="h-1 w-full mb-1" style={{ background: colors.secondary }}></div>
               <div className="h-8 w-full bg-white rounded border border-slate-100"></div>
            </div>
         </div>
      </div>
    );
  }

  
  // Generic Fallbacks based on layout_type
  switch (layout) {
    case 'minimal':
      return (
        <div className="w-full h-full bg-white p-3 flex flex-col shadow-sm border-t-4" style={{ borderColor: colors.primary }}>
          <div className="mb-3 pb-1 border-b border-slate-100">
            <div className="h-2 w-1/2 mb-1" style={{ background: colors.primary }}></div>
            <div className="h-1 w-1/3 bg-slate-400"></div>
          </div>
          <div className="flex-1 space-y-2">
             {renderSection(2)}
             {renderSection(3)}
          </div>
        </div>
      );
    
    case 'grid':
      return (
        <div className="w-full h-full bg-white p-3 shadow-sm">
          <div className="mb-2 flex gap-2">
            <div className="h-10 w-10 bg-slate-200 rounded"></div>
            <div className="flex-1">
                <div className="h-2 w-1/2 mb-1" style={{ background: colors.accent }}></div>
                <div className="h-1 w-1/3 bg-slate-400"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="col-span-1 p-1 bg-slate-50 rounded">
               {renderSection(3)}
            </div>
            <div className="col-span-1 p-1 bg-slate-50 rounded">
               {renderSection(3)}
            </div>
          </div>
        </div>
      );

    case 'sidebar':
      return (
        <div className="w-full h-full bg-white flex shadow-sm">
          <div className="w-1/3 p-2 h-full" style={{ background: colors.primary, opacity: 0.1 }}>
            <div className="h-6 w-6 rounded-full mb-2 mx-auto" style={{ background: colors.primary }}></div>
            {renderSection(4)}
          </div>
          <div className="w-2/3 p-2">
             <div className="h-2 w-2/3 mb-2" style={{ background: colors.primary }}></div>
             {renderSection(3)}
             {renderSection(3)}
          </div>
        </div>
      );

    case 'header-blue':
      return (
        <div className="w-full h-full bg-white shadow-sm flex flex-col">
          <div className="h-8 w-full mb-2 flex items-center px-2" style={{ background: colors.primary }}>
             <div className="h-2 w-1/3 bg-white opacity-50"></div>
          </div>
          <div className="px-2">
             <div className="flex justify-between mb-2">
                <div className="h-8 w-8 rounded bg-slate-100 text-center text-[8px] flex items-center justify-center font-bold text-slate-400">IMG</div>
                <div className="flex-1 ml-2">
                    {renderSection(2)}
                </div>
             </div>
             {renderSection(3)}
          </div>
        </div>
      );

    case 'dark':
      return (
        <div className="w-full h-full p-3 shadow-sm text-white" style={{ background: colors.primary }}>
           <div className="h-2 w-1/2 bg-white mb-2 opacity-90"></div>
           <div className="grid grid-cols-2 gap-2">
             <div className="opacity-70">{renderSection(3)}</div>
             <div className="opacity-70">{renderSection(3)}</div>
           </div>
        </div>
      );
      
    case 'serif':
      return (
        <div className="w-full h-full p-3 shadow-sm border-t-4" style={{ backgroundColor: colors.secondary, borderColor: colors.primary }}>
           <div className="h-2 w-1/2 mb-1 mx-auto" style={{ background: colors.primary }}></div>
           <div className="h-[1px] w-full bg-slate-200 my-2"></div>
           <div className="flex gap-2">
             <div className="flex-1">{renderSection(4)}</div>
             <div className="flex-1">{renderSection(4)}</div>
           </div>
        </div>
      );

    case 'accent':
      return (
        <div className="w-full h-full bg-white p-3 shadow-sm border-l-4" style={{ borderColor: colors.accent }}>
           <div className="h-3 w-1/2 mb-2 px-1 text-white" style={{ background: colors.primary }}></div>
           {renderSection(2)}
           {renderSection(3)}
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-white p-3 shadow-sm border border-slate-100 flex items-center justify-center">
            <span className="text-xs text-slate-400">Preview</span>
        </div>
      );
  }
};


const TemplateSelectionOverlay = ({ onClose, isModal = false }) => {
  const { setTemplate, loadCVData, updateDesign, setThemeColor } = useCVStore();
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  // const t = TRANSLATIONS[language];

  // Filter State
  const [activeProfile, setActiveProfile] = useState('Todos');
  const [activeRole, setActiveRole] = useState('Todos');
  const [activeLevel, setActiveLevel] = useState('Todos');

  // Filter Logic
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchProfile = activeProfile === 'Todos' || template.tags.profile === activeProfile;
      // Check if activeRole is included in the template's roles array
      const matchRole = activeRole === 'Todos' || (template.roles && template.roles.includes(activeRole));
      const matchLevel = activeLevel === 'Todos' || (template.tags.level && template.tags.level.includes(activeLevel));
      return matchProfile && matchRole && matchLevel;
    });
  }, [activeProfile, activeRole, activeLevel]);

  const handleSelect = (templateId) => {
    // Find the selected template
    const selectedTemplate = templates.find(t => t.id === templateId);
    
    if (selectedTemplate) {
      // Determine which role to use for data loading
      const targetRole = activeRole !== 'Todos' ? activeRole : (selectedTemplate.roles ? selectedTemplate.roles[0] : null);

      // Get role-specific data
      const roleData = getRoleData(selectedTemplate.tags.profile, targetRole);
      
      // Load specific data if available
      if (roleData) {
        loadCVData(roleData);
      }

      // Apply Template Design Settings (Fonts & Colors)
      if (selectedTemplate.fonts) {
        updateDesign({
           fontFamily: selectedTemplate.fonts.body,
           titleFont: selectedTemplate.fonts.title
        });
      }

      if (selectedTemplate.colorHex) {
        // Set the main accent color
        setThemeColor(selectedTemplate.colorHex.accent);
        
        // If the template needs primary/secondary colors passed as design props, we could do it here
        // But currently base components mostly use themeColor or hardcoded styles.
        // We'll rely on the themeColor for now.
      }
    }

    setTemplate(templateId);
    navigate('/editor');
  };

  /* const handleDownloadSample = (e, templateId) => {
    e.stopPropagation();
    console.log(`Descargando ejemplo para: ${templateId}`);
    // Implementar lógica de descarga de ejemplo si es necesario
  }; */

  /* const getTemplateBadge = (tags) => {
    if (!tags || tags.length === 0) return null;
    
    // const accentBox = "bg-indigo-100 text-indigo-700 border border-indigo-200";
    
    if (tags.includes('Popular')) {
      return (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Star size={10} fill="currentColor" /> POPULAR
        </div>
      );
    }
  }; */

  return (
    <div className={`w-full min-h-screen bg-[var(--bg-app)] flex flex-col ${isModal ? 'fixed inset-0 z-50 overflow-y-auto' : 'relative'} font-sans text-[var(--text-main)] transition-colors duration-300`}>
      <BackgroundAmbience />
      
      {/* Close Button (Modal Mode) */}
      {isModal && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-[var(--bg-panel)] rounded-full shadow-lg hover:bg-[var(--bg-muted)] z-50 transition-colors border border-[var(--border-subtle)]"
        >
          <Zap size={24} className="text-[var(--text-secondary)]" />
        </button>
      )}

      {/* Back Button (Standalone Mode) */}
      {!isModal && (
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 bg-[var(--bg-panel)] rounded-full shadow-lg hover:bg-[var(--bg-muted)] z-50 transition-colors border border-[var(--border-subtle)] flex items-center gap-2 px-4"
        >
          <ArrowLeft size={20} className="text-[var(--text-secondary)]" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">Volver</span>
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6 tracking-tight"
          >
            Plantillas diseñadas para tu <span className="text-blue-500">industria, rol y nivel</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8"
          >
            No usamos plantillas genéricas. Usamos estructuras diseñadas para tu rol, tu industria y tu nivel profesional.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[var(--text-secondary)]"
          >
            <div className="flex items-center gap-2 bg-[var(--bg-panel)] px-4 py-2 rounded-full shadow-lg border border-[var(--border-subtle)] backdrop-blur-sm">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Aprobadas por reclutadores</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg-panel)] px-4 py-2 rounded-full shadow-lg border border-[var(--border-subtle)] backdrop-blur-sm">
              <LayoutTemplate size={16} className="text-blue-500" />
              <span>Estructura profesional validada</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg-panel)] px-4 py-2 rounded-full shadow-lg border border-[var(--border-subtle)] backdrop-blur-sm">
              <Briefcase size={16} className="text-purple-500" />
              <span>Listas para procesos reales</span>
            </div>
          </motion.div>
        </div>

        {/* Filters Section */}
        <div className="mb-12 bg-[var(--bg-panel)]/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[var(--border-subtle)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            {/* Filter Group: Profile */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
                <Layers size={14} /> Perfil
              </span>
              <div className="flex flex-wrap gap-1">
                {FILTERS.profiles.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveProfile(filter)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeProfile === filter 
                        ? 'bg-[var(--primary)] text-white shadow-md' 
                        : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]/80 hover:text-[var(--text-main)]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Role */}
            <div className="space-y-2">
               <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
                 <Briefcase size={14} /> Rol
               </span>
               <select 
                 value={activeRole}
                 onChange={(e) => setActiveRole(e.target.value)}
                 className="w-full p-2 rounded-md bg-[var(--bg-muted)] border-none text-sm text-[var(--text-main)] font-medium focus:ring-2 focus:ring-blue-500/30 outline-none"
               >
                 {FILTERS.roles.map(role => (
                   <option key={role} value={role}>{role}</option>
                 ))}
               </select>
            </div>

            {/* Filter Group: Level */}
            <div className="space-y-2">
               <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
                 <Star size={14} /> Nivel
               </span>
               <div className="flex flex-wrap gap-1">
                {FILTERS.levels.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveLevel(filter)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeLevel === filter 
                        ? 'bg-[var(--primary)] text-white shadow-md' 
                        : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]/80 hover:text-[var(--text-main)]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search / Reset */}
            <div className="flex items-end">
               <button 
                 onClick={() => { setActiveProfile('Todos'); setActiveRole('Todos'); setActiveLevel('Todos'); }}
                 className="w-full py-2 px-4 rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors"
               >
                 Resetear Filtros
               </button>
            </div>

          </div>
        </div>

        {/* Templates Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredTemplates.map((template) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={template.id}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => handleSelect(template.id)}
                className={`
                  group relative bg-[var(--bg-panel)] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                  ${hoveredTemplate === template.id ? 'ring-4 ring-blue-500/20 shadow-2xl scale-[1.02]' : 'border border-[var(--border-subtle)] shadow-lg hover:shadow-xl'}
                `}
              >
                {/* Badge */}
                {template.badge && (
                  <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${template.badgeColor || 'bg-[var(--primary)]'}`}>
                    {template.badge}
                  </div>
                )}

                {/* Preview Container */}
                <div className="h-64 w-full bg-[var(--bg-muted)] relative overflow-hidden">
                   {/* Live Mini Preview */}
                   <div className="absolute inset-4 rounded-lg shadow-sm overflow-hidden transition-transform duration-500 group-hover:scale-105">
                      <MiniCVPreview template={template} />
                   </div>

                   {/* Overlay Actions */}
                   <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm transform transition-transform hover:scale-105 flex items-center gap-2">
                        <Check size={16} /> Seleccionar
                      </button>
                   </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-blue-500 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">{template.design_identity}</p>
                    </div>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Keywords Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.keywords.slice(0, 3).map((keyword, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-[var(--bg-muted)] text-[var(--text-secondary)] px-2 py-1 rounded-md">
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]">
                      <div className={`w-2 h-2 rounded-full ${template.ats_score.includes('High') || template.ats_score.includes('Max') ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      ATS Score: {template.ats_score}
                    </div>
                    
                    {/* Download Sample Button - Optional */}
                    {/* 
                    <button 
                      onClick={(e) => handleDownloadSample(e, 'word', template.id)}
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="Descargar ejemplo Word"
                    >
                      <FileText size={18} />
                    </button>
                    */}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-24">
            <div className="bg-[var(--bg-muted)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-[var(--text-secondary)]" size={24} />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">No se encontraron plantillas</h3>
            <p className="text-[var(--text-secondary)]">Intenta ajustar los filtros para ver más resultados.</p>
            <button 
               onClick={() => { setActiveProfile('Todos'); setActiveRole('Todos'); setActiveLevel('Todos'); }}
               className="mt-4 text-blue-500 font-medium hover:underline"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TemplateSelectionOverlay;
