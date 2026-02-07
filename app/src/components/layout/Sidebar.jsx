import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Settings, Download, Upload, Save, FileText, Edit3, Globe, FolderOpen, Bot } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { motion } from 'framer-motion';

const Sidebar = ({ onPrint }) => {
  const { cvData, loadCVData, language } = useCVStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const t = TRANSLATIONS[language];

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
    <aside className="h-full w-20 bg-[var(--bg-panel)]/80 backdrop-blur-xl border-r border-[var(--border-subtle)] flex flex-col items-center py-6 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative transition-all duration-300">
      <div 
        className="mb-8 w-12 h-12 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      
      <nav className="flex-1 w-full flex flex-col items-center gap-4 px-3">
        <SidebarButton 
          active={location.pathname === '/editor'} 
          onClick={() => navigate('/editor')}
          icon={<Edit3 size={20} />}
          label={t.editor}
        />
        <SidebarButton 
          active={location.pathname === '/templates'} 
          onClick={() => navigate('/templates')}
          icon={<Layout size={20} />}
          label={t.templates}
        />

        <SidebarButton 
          active={location.pathname === '/ai-assistant'} 
          onClick={() => navigate('/ai-assistant')}
          icon={<Bot size={20} />}
          label="Asistente IA"
        />

        <SidebarButton 
          active={location.pathname === '/saved'} 
          onClick={() => navigate('/saved')}
          icon={<FolderOpen size={20} />}
          label="Mis CVs"
        />
        
        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent my-2 opacity-60" />
        
        <SidebarButton 
          onClick={onPrint || (() => window.print())}
          icon={<Download size={20} />}
          label={t.export}
          variant="primary"
        />

        <SidebarButton 
          onClick={handleExportJSON}
          icon={<Save size={20} />}
          label={t.exportJSON}
          variant="secondary"
        />

        <div className="relative group w-full flex justify-center">
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
            />
        </div>
      </nav>
    </aside>
  );
};

const SidebarButton = ({ active, onClick, icon, label, variant = 'default' }) => {
  const getColors = () => {
    if (variant === 'primary') return 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-100 hover:shadow-md hover:shadow-indigo-500/10';
    if (variant === 'secondary') return 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200';
    
    return active 
      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border-transparent scale-105 ring-2 ring-indigo-100 ring-offset-2' 
      : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-500 border-transparent hover:shadow-sm';
  };

  return (
    <div className="relative group flex items-center justify-center w-full z-50">
      <button
        onClick={onClick}
        aria-label={label}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border ${getColors()}`}
      >
        {active ? React.cloneElement(icon, { strokeWidth: 2.5 }) : icon}
      </button>
      
      {/* Tooltip Premium Glassmorphism */}
      <div className="absolute left-16 px-4 py-2.5 bg-white/90 backdrop-blur-xl border border-slate-200/60 text-slate-700 text-xs font-bold rounded-xl shadow-xl shadow-slate-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-x-4 group-hover:translate-x-0 z-[100]">
        {label}
        {/* Flechita del tooltip */}
        <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white/90 border-l border-b border-slate-200/60 transform rotate-45 rounded-bl-[1px]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
