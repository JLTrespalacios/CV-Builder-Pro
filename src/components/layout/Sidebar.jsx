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
    <aside className="h-full w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-20 shadow-sm relative">
      <div className="mb-8 p-2 bg-blue-50 rounded-xl border border-blue-100">
        <FileText size={24} className="text-blue-600" />
      </div>
      
      <nav className="flex-1 w-full flex flex-col items-center gap-4 px-2">
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
        
        <div className="w-8 h-[1px] bg-slate-200 my-2" />
        
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
    if (variant === 'primary') return 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200';
    if (variant === 'secondary') return 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-muted)] border-transparent hover:border-[var(--border-subtle)]';
    
    return active 
      ? 'bg-blue-600 text-white shadow-md shadow-blue-200 border-transparent' 
      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] border-transparent';
  };

  return (
    <div className="relative group flex items-center justify-center">
      <button
        onClick={onClick}
        aria-label={label}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 border hover-btn ${getColors()}`}
      >
        {icon}
      </button>
      
      {/* Tooltip Premium */}
      <div className="absolute left-14 px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 transform translate-x-2 group-hover:translate-x-0 transition-transform">
        {label}
        {/* Flechita del tooltip */}
        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default Sidebar;
