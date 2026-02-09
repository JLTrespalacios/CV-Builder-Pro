import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Settings, Download, Upload, Save, FileText, Edit3, Globe, FolderOpen, Bot, ChevronLeft, ChevronRight, Cloud, Sparkles, Command } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import DesignControls from '../preview/DesignControls';
import CloudExportModal from '../ui/CloudExportModal';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onPrint }) => {
  const { cvData, loadCVData, language, isSidebarOpen, toggleSidebar } = useCVStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const t = TRANSLATIONS[language];
  const [isToolsOpen, setIsToolsOpen] = React.useState(false);
  const [isCloudModalOpen, setIsCloudModalOpen] = React.useState(false);

  // Close tools popover when sidebar collapses
  React.useEffect(() => {
    if (!isSidebarOpen) {
      setIsToolsOpen(false);
    }
  }, [isSidebarOpen]);

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cv_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Copia de seguridad guardada correctamente.', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.personal && json.skills) {
          if (window.confirm('¿Estás seguro de cargar este archivo? Se reemplazarán los datos actuales.')) {
            loadCVData(json);
            addToast('Datos cargados correctamente.', 'success');
          }
        } else {
          addToast('El archivo seleccionado no tiene un formato válido de CV.', 'error');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        addToast('Error al leer el archivo JSON.', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <aside 
      className={`h-full bg-[var(--bg-panel)]/80 backdrop-blur-xl border-r border-[var(--border-subtle)] flex flex-col py-6 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative transition-all duration-300 ${
        isSidebarOpen ? 'w-64 items-start' : 'w-20 items-center'
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-50 hover:bg-indigo-700 transition-all hover:scale-110 border border-white/10"
      >
        {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <div 
        className={`mb-8 transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-3 px-4 ${isSidebarOpen ? 'w-full' : 'justify-center'}`}
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 min-w-[2.5rem]">
           <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
        
        {isSidebarOpen && (
          <div className="overflow-hidden whitespace-nowrap opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <h1 className="font-bold text-lg text-white leading-tight">CV Builder</h1>
            <p className="text-[10px] text-indigo-400 font-medium tracking-wider">PRO EDITOR</p>
          </div>
        )}
      </div>
      
      <nav className={`flex-1 w-full flex flex-col gap-3 ${isSidebarOpen ? 'px-4' : 'px-3 items-center'}`}>
        <SidebarButton 
          active={location.pathname === '/editor'} 
          onClick={() => navigate('/editor')}
          icon={<Edit3 size={20} />}
          label={t.editor}
          isOpen={isSidebarOpen}
        />
        <SidebarButton 
          active={location.pathname === '/templates'} 
          onClick={() => navigate('/templates')}
          icon={<Layout size={20} />}
          label={t.templates}
          isOpen={isSidebarOpen}
        />

        <SidebarButton 
          active={location.pathname === '/ai-assistant'} 
          onClick={() => navigate('/ai-assistant')}
          icon={<Bot size={20} />}
          label="Asistente IA"
          isOpen={isSidebarOpen}
        />

        <SidebarButton 
          active={location.pathname === '/saved'} 
          onClick={() => navigate('/saved')}
          icon={<FolderOpen size={20} />}
          label="Mis CVs"
          isOpen={isSidebarOpen}
        />

        {/* Tools Menu Trigger */}
        <div className="relative w-full">
            <SidebarButton 
                active={isToolsOpen}
                onClick={() => {
                    if (!isSidebarOpen) {
                        toggleSidebar();
                        setTimeout(() => setIsToolsOpen(true), 300);
                    } else {
                        setIsToolsOpen(!isToolsOpen);
                    }
                }}
                icon={<Command size={20} />}
                label="Herramientas"
                isOpen={isSidebarOpen}
            />
            
            <AnimatePresence>
                {isToolsOpen && isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-full top-0 ml-4 w-72 bg-[#0f1428]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-[100] overflow-hidden ring-1 ring-white/5 origin-left"
                    >
                        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Herramientas de Diseño</span>
                            <Settings size={14} className="text-indigo-400" />
                        </div>
                        
                        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <DesignControls />
                        </div>

                        <div className="p-3 bg-white/5 border-t border-white/5 text-center">
                            <p className="text-[10px] text-slate-500">
                                Cambios aplicados en tiempo real
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
        <div className={`h-[1px] bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent my-2 opacity-60 ${isSidebarOpen ? 'w-full' : 'w-10'}`} />
        
        <SidebarButton 
          onClick={onPrint || (() => window.print())}
          icon={<Download size={20} />}
          label={t.downloadPDF || "Descargar PDF"}
          variant="primary"
          isOpen={isSidebarOpen}
        />

        <div className="relative w-full">
             <SidebarButton 
                 active={isCloudModalOpen}
                 onClick={() => {
                     if (!isSidebarOpen) {
                         toggleSidebar();
                         setTimeout(() => setIsCloudModalOpen(true), 300);
                     } else {
                         setIsCloudModalOpen(!isCloudModalOpen);
                     }
                 }}
                 icon={<Cloud size={20} />}
                 label="Guardar en Nube"
                 variant="secondary"
                 isOpen={isSidebarOpen}
             />
             <CloudExportModal 
                isOpen={isCloudModalOpen} 
                onClose={() => setIsCloudModalOpen(false)} 
             />
        </div>

        <SidebarButton 
          onClick={handleExportJSON}
          icon={<Save size={20} />}
          label={t.exportJSON}
          variant="secondary"
          isOpen={isSidebarOpen}
        />

        <div className={`relative group w-full flex ${isSidebarOpen ? '' : 'justify-center'}`}>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden" 
            />
            <SidebarButton 
              onClick={handleImportClick}
              icon={<Upload size={20} />}
              label={t.importJSON}
              variant="secondary"
              isOpen={isSidebarOpen}
            />
        </div>
      </nav>
    </aside>
  );
};

const SidebarButton = ({ active, onClick, icon, label, variant = 'default', isOpen }) => {
  const getColors = () => {
    if (variant === 'primary') return 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border-transparent hover:shadow-indigo-500/40 hover:scale-[1.02]';
    if (variant === 'secondary') return 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200';
    
    return active 
      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border-transparent scale-[1.02] ring-1 ring-indigo-500/30' 
      : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-500 border-transparent hover:shadow-sm';
  };

  return (
    <div className={`relative group flex items-center w-full z-50 ${isOpen ? '' : 'justify-center'}`}>
      <button
        onClick={onClick}
        aria-label={label}
        className={`flex items-center transition-all duration-300 border ${getColors()} ${
          isOpen 
            ? 'w-full px-4 py-3 rounded-xl gap-3 justify-start' 
            : 'w-12 h-12 rounded-2xl justify-center'
        }`}
      >
        <div className="shrink-0">
          {active ? React.cloneElement(icon, { strokeWidth: 2.5 }) : icon}
        </div>
        
        {isOpen && (
          <span className={`text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis opacity-0 animate-fade-in ${active ? 'text-white' : ''}`} style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>
            {label}
          </span>
        )}
      </button>
      
      {/* Tooltip - Only Show when Collapsed */}
      {!isOpen && (
        <div className="absolute left-14 px-4 py-2.5 bg-white/90 backdrop-blur-xl border border-slate-200/60 text-slate-700 text-xs font-bold rounded-xl shadow-xl shadow-slate-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-x-4 group-hover:translate-x-0 z-[100]">
          {label}
          <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white/90 border-l border-b border-slate-200/60 transform rotate-45 rounded-bl-[1px]"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
