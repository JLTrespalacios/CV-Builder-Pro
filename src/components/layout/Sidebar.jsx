import React, { useRef } from 'react';
import { Layout, Settings, Download, Upload, Save, FileText, Edit3, Globe, FolderOpen, Bot } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';

const Sidebar = ({ onPrint }) => {
  const { activeTab, setActiveTab, cvData, loadCVData, language, setLanguage } = useCVStore();
  const { addToast } = useUIStore();
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
    <aside className="h-full w-20 bg-[var(--bg-panel)] border-r border-[var(--border-subtle)] flex flex-col items-center py-6 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative transition-colors duration-300">
      <div className="mb-8 p-2.5 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl shadow-lg shadow-[var(--primary)]/20 text-white">
        <FileText size={24} />
      </div>
      
      <nav className="flex-1 w-full flex flex-col items-center gap-3 px-3">
        <SidebarButton 
          active={activeTab === 'editor'} 
          onClick={() => setActiveTab('editor')}
          icon={<Edit3 size={20} />}
          label={t.editor}
        />
        <SidebarButton 
          active={activeTab === 'templates'} 
          onClick={() => setActiveTab('templates')}
          icon={<Layout size={20} />}
          label={t.templates}
        />

        <SidebarButton 
          active={activeTab === 'ai-assistant'} 
          onClick={() => setActiveTab('ai-assistant')}
          icon={<Bot size={20} />}
          label="Asistente IA"
        />

        <SidebarButton 
          active={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
          icon={<FolderOpen size={20} />}
          label="Mis CVs"
        />
        
        <div className="w-10 h-[1px] bg-[var(--border-subtle)] my-3 opacity-60" />
        
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

      <div className="mt-auto flex flex-col gap-4 w-full px-2 items-center pb-4">
        {/* Language Toggle in Sidebar if needed, though it's in Header too */}
      </div>
    </aside>
  );
};

const SidebarButton = ({ active, onClick, icon, label, variant = 'default' }) => {
  const getColors = () => {
    if (variant === 'primary') return 'text-[var(--primary)] bg-[var(--primary-light)]/50 hover:bg-[var(--primary-light)] border-[var(--primary)]/20';
    if (variant === 'secondary') return 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-muted)] border-transparent hover:border-[var(--border-subtle)]';
    
    return active 
      ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30 border-transparent scale-105' 
      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] border-transparent';
  };

  return (
    <div className="relative group flex items-center justify-center w-full">
      <button
        onClick={onClick}
        aria-label={label}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border hover-btn ${getColors()}`}
      >
        {icon}
      </button>
      
      {/* Tooltip Premium */}
      <div className="absolute left-14 px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50 transform translate-x-2 group-hover:translate-x-0 backdrop-blur-sm bg-slate-900/90">
        {label}
        {/* Flechita del tooltip */}
        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800/90 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default Sidebar;
