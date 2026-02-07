import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Globe, Trash2, PanelLeftOpen, FileText, Download, Upload, Languages, Cloud, ChevronDown, Save } from 'lucide-react';
// import ThemeSwitcher from '../ui/ThemeSwitcher';
import DesignControls from '../preview/DesignControls';
import LanguageSelector from '../ui/LanguageSelector';
import CloudExportModal from '../ui/CloudExportModal';
// import { generatePDF } from '../../utils/pdfGenerator'; 
// import { generateWord } from '../../utils/wordGenerator';
import { extractTextFromPDF } from '../../utils/pdfImporter';
import { parseCVText } from '../../utils/cvParser';

const Header = ({ onDownload }) => {
  const { language, resetCVData, isSidebarOpen, toggleSidebar, cvData, loadCVData, translateData } = useCVStore();
  const { addToast } = useUIStore();
  const t = TRANSLATIONS[language];
  const fileInputRef = React.useRef(null);
  const [isSaveMenuOpen, setIsSaveMenuOpen] = React.useState(false);
  const [isCloudModalOpen, setIsCloudModalOpen] = React.useState(false);

  const handleReset = () => {
    if (window.confirm(t.confirmReset)) {
      resetCVData();
      addToast(t.resetSuccess, 'success');
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
      addToast('Archivo guardado. Puedes subirlo a Drive/OneDrive manualmente.', 'success');
      setIsSaveMenuOpen(false);
    } catch (error) {
      console.error(error);
      addToast('Error al exportar datos', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
    setIsSaveMenuOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = '';

    // PDF Handling
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      try {
        addToast('Analizando PDF... Esto puede tardar unos segundos.', 'info');
        const text = await extractTextFromPDF(file);
        const parsedData = parseCVText(text);
        
        // Merge or replace? For now replace to be safe, or we could ask.
        // But loadCVData typically replaces.
        loadCVData(parsedData);
        addToast('PDF Importado. Revisa y corrige los datos extraídos.', 'success');
      } catch (error) {
        console.error(error);
        addToast('Error al importar PDF: ' + error.message, 'error');
      }
      event.target.value = '';
      return;
    }

    // JSON Handling
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



  /* const handleDownloadWord = async () => {
    try {
      await generateWord(cvData, t);
      addToast('CV descargado en Word', 'success');
    } catch (error) {
      console.error(error);
      addToast('Error al descargar Word', 'error');
    }
  }; */

  return (
    <header className="h-16 bg-[var(--bg-panel)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between px-6 z-50 fixed top-0 right-0 left-20 transition-colors duration-300">
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
          <img 
            src="/logo.svg" 
            alt="CV Builder Logo" 
            className="w-8 h-8 rounded-xl shadow-lg shadow-[var(--primary)]/20 transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight flex items-center gap-1 font-sans">
            CV<span className="text-[var(--primary)]">Builder</span>
            <span className="bg-[var(--bg-muted)] text-[var(--text-secondary)] font-medium text-[10px] px-1.5 py-0.5 rounded-md ml-1 border border-[var(--border-subtle)] uppercase tracking-wide">Pro</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Theme Switcher Removed by user request */}
        
        <LanguageSelector 
          currentLang={language} 
          onLanguageChange={(lang) => {
            translateData(lang);
            addToast('Idioma cambiado. Traduciendo contenido...', 'success');
          }} 
        />

        <div className="h-6 w-px bg-[var(--border-subtle)] mx-1"></div>
        
        <DesignControls />

        {/* Menú de Guardado / Nube */}
        <div className="relative">
          <button 
            onClick={() => setIsSaveMenuOpen(!isSaveMenuOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 font-medium text-xs ${
              isSaveMenuOpen 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                : 'bg-[var(--bg-panel)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-blue-300 hover:text-blue-600 hover:shadow-sm'
            }`}
            title="Opciones de Guardado y Nube"
          >
            <Cloud size={16} />
            <span className="hidden sm:inline">Guardar/Cargar</span>
            {isSaveMenuOpen ? <ChevronDown size={14} className="rotate-180 transition-transform" /> : <ChevronDown size={14} className="transition-transform" />}
          </button>

          {isSaveMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsSaveMenuOpen(false)}></div>
              <div className="absolute top-full right-0 mt-2 w-64 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in">
                <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-muted)]/50">
                  <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Gestión de Archivos</h3>
                </div>
                <div className="p-1">
                  
                  {/* Nueva opción Cloud */}
                  <button 
                    onClick={() => {
                        setIsCloudModalOpen(true);
                        setIsSaveMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 hover:bg-[var(--bg-muted)] rounded-lg text-xs font-medium text-[var(--text-main)] flex items-center gap-3 transition-colors mb-1"
                  >
                    <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                      <Cloud size={14} />
                    </div>
                    <div>
                      <span className="block font-bold text-indigo-600">Guardar en la Nube</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">Drive, Dropbox, OneDrive...</span>
                    </div>
                  </button>

                  <div className="h-px bg-[var(--border-subtle)] my-1"></div>

                  <button 
                    onClick={handleExport}
                    className="w-full text-left px-3 py-2.5 hover:bg-[var(--bg-muted)] rounded-lg text-xs font-medium text-[var(--text-main)] flex items-center gap-3 transition-colors"
                  >
                    <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                      <Download size={14} />
                    </div>
                    <div>
                      <span className="block font-bold">Descargar Respaldo</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">Guardar en PC o Drive/OneDrive</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={handleImportClick}
                    className="w-full text-left px-3 py-2.5 hover:bg-[var(--bg-muted)] rounded-lg text-xs font-medium text-[var(--text-main)] flex items-center gap-3 transition-colors"
                  >
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                      <Upload size={14} />
                    </div>
                    <div>
                      <span className="block font-bold">Cargar / Importar</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">Soporta .json (Respaldo) y .pdf (Importar)</span>
                    </div>
                  </button>

                  <div className="h-px bg-[var(--border-subtle)] my-1"></div>

                  <div className="px-3 py-2 text-[10px] text-[var(--text-secondary)] italic text-center">
                    Los cambios se guardan automáticamente en este navegador.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Input oculto para carga de archivos */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".json, .pdf" 
          className="hidden" 
        />
        
        <CloudExportModal 
            isOpen={isCloudModalOpen} 
            onClose={() => setIsCloudModalOpen(false)} 
        />

        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-red-500 transition-colors border border-transparent hover:bg-red-500/10 rounded-xl group"
          title={t.reset}
        >
          <Trash2 size={16} className="text-[var(--text-secondary)] group-hover:text-red-500 transition-colors" />
        </button>
        
        {/* <button 
          onClick={handleDownloadWord}
          className="px-4 py-2 bg-[var(--bg-panel)] text-[var(--primary)] border border-[var(--border-subtle)] hover:border-[var(--primary)]/50 text-xs font-bold rounded-xl hover:bg-[var(--bg-muted)] transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          title="Descargar en Word"
        >
          <FileText size={16} />
          Word
        </button> */}

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
