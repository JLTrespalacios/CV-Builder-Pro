import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Globe, Trash2, PanelLeftOpen, FileText, Download, Upload, Languages } from 'lucide-react';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import DesignControls from '../preview/DesignControls';
import { generateWord } from '../../utils/wordGenerator';

const Header = ({ onDownload }) => {
  const { language, setLanguage, resetCVData, isSidebarOpen, toggleSidebar, cvData, loadCVData } = useCVStore();
  const { addToast } = useUIStore();
  const t = TRANSLATIONS[language];
  const fileInputRef = React.useRef(null);

  const handleReset = () => {
    if (window.confirm('WARNING: SYSTEM RESET. ¿Estás seguro de borrar todos los datos? Esta acción es irreversible.')) {
      resetCVData();
      addToast('Sistema reiniciado. Datos eliminados.', 'info');
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(cvData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cv-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast('Copia de seguridad descargada', 'success');
    } catch (error) {
      console.error(error);
      addToast('Error al exportar datos', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (!json.personal) throw new Error("Formato inválido");
        loadCVData(json);
        addToast('Datos cargados exitosamente. Puedes seguir editando.', 'success');
      } catch (error) {
        console.error(error);
        addToast('Error: Archivo inválido o corrupto', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleTranslateAll = () => {
    // Logic to toggle language or translate content
    if (language === 'es') {
      setLanguage('en');
      addToast('Idioma cambiado a Inglés. Los encabezados se han traducido.', 'success');
    } else {
      setLanguage('es');
      addToast('Idioma cambiado a Español.', 'success');
    }
    // Future: Call AI API to translate user content
  };

  const handleDownloadWord = async () => {
    try {
      await generateWord(cvData, t);
      addToast('CV descargado en Word', 'success');
    } catch (error) {
      console.error(error);
      addToast('Error al descargar Word', 'error');
    }
  };

  return (
    <header className="h-16 bg-[var(--bg-panel)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between px-6 z-50 sticky top-0 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--bg-muted)] rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            title="Mostrar panel lateral"
          >
            <PanelLeftOpen size={20} />
          </button>
        )}
        <div className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] p-1.5 rounded-xl shadow-lg shadow-[var(--primary)]/20 transition-transform duration-300 group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight flex items-center gap-1 font-sans">
            CV<span className="text-[var(--primary)]">Builder</span>
            <span className="bg-[var(--bg-muted)] text-[var(--text-secondary)] font-medium text-[10px] px-1.5 py-0.5 rounded-md ml-1 border border-[var(--border-subtle)] uppercase tracking-wide">Pro</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        
        <div className="flex items-center gap-2 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-xl px-3 py-1.5 hover:border-[var(--primary)]/30 transition-all hover:shadow-md hover:-translate-y-0.5 group cursor-pointer">
          <Globe size={14} className="text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            aria-label={t.language || "Seleccionar idioma"}
            className="bg-transparent border-none text-xs text-[var(--text-main)] font-medium focus:outline-none cursor-pointer uppercase appearance-none pr-4"
            style={{ backgroundImage: 'none' }}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>

        <div className="h-6 w-px bg-[var(--border-subtle)] mx-1"></div>
        
        <DesignControls />

        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-red-500 transition-colors border border-transparent hover:bg-red-500/10 rounded-xl group"
          title={t.reset}
        >
          <Trash2 size={16} className="text-[var(--text-secondary)] group-hover:text-red-500 transition-colors" />
        </button>
        
        <button 
          onClick={handleDownloadWord}
          className="px-4 py-2 bg-[var(--bg-panel)] text-[var(--primary)] border border-[var(--border-subtle)] hover:border-[var(--primary)]/50 text-xs font-bold rounded-xl hover:bg-[var(--bg-muted)] transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          title="Descargar en Word"
        >
          <FileText size={16} />
          Word
        </button>

        <button 
          onClick={onDownload}
          className="px-5 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white border border-transparent text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-[var(--primary)]/25 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
        >
          <Download size={16} />
          {t.downloadPDF || "Descargar PDF"}
        </button>
      </div>
    </header>
  );
};

export default Header;
