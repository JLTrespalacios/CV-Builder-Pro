import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { 
  Globe, Trash2, PanelLeftOpen, FileText, Download, Upload, 
  Languages, Cloud, ChevronDown, Save, User, Settings, Sparkles, Command,
  Palette, Type, Layout, Grid
} from 'lucide-react';
import DesignControls from '../preview/DesignControls';
import LanguageSelector from '../ui/LanguageSelector';
import CloudExportModal from '../ui/CloudExportModal';
import { extractTextFromPDF } from '../../utils/pdfImporter';
import { parseCVText } from '../../utils/cvParser';

import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onDownload }) => {
  const { language, resetCVData, isSidebarOpen, toggleSidebar, cvData, loadCVData, translateData } = useCVStore();
  const { addToast } = useUIStore();
  const t = TRANSLATIONS[language];
  const fileInputRef = React.useRef(null);
  const [isSaveMenuOpen, setIsSaveMenuOpen] = React.useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = React.useState(false);
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
        loadCVData(parsedData);
        addToast('PDF Importado. Revisa y corrige los datos extraídos.', 'success');
      } catch (error) {
        console.error(error);
        addToast('Error al importar PDF: ' + error.message, 'error');
      }
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
  };

  // Common Dropdown Classes
  const dropdownClasses = "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-[#0f1428]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden ring-1 ring-white/5 origin-top";
  const dropdownItemClasses = "w-full text-left px-3 py-3 hover:bg-white/5 rounded-xl text-xs font-medium text-slate-200 flex items-center gap-3 transition-all group";
  const dropdownIconContainerClasses = (colorClass, bgClass) => `p-2 ${bgClass} ${colorClass} rounded-lg group-hover:scale-110 transition-all`;

  return (
    <header className="h-[72px] flex items-center justify-between px-6 fixed top-0 right-0 left-0 lg:left-0 z-50 transition-all duration-300 backdrop-blur-[14px] shadow-lg shadow-black/20"
      style={{
        background: 'linear-gradient(180deg, rgba(15,20,40,0.85), rgba(10,15,30,0.75))',
        borderBottom: '1px solid rgba(129, 140, 248, 0.15)' // Subtle indigo tint
      }}
    >
        {/* Glow Line Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-70" />

      {/* Left: Logo & Branding */}
      <div className="flex items-center gap-5">
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <PanelLeftOpen size={20} />
          </button>
        )}
        
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Minimalist Logo */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10">
            <span className="font-bold text-white text-xs tracking-tighter">CV</span>
          </div>
          
          <div className="flex flex-col justify-center">
             <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight font-sans leading-none">
                  CV Builder
                </h1>
                {/* PRO Badge with Neon Pulse */}
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-[6px] opacity-40 animate-pulse"></div>
                    <span className="relative bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                    PRO
                    </span>
                </div>
             </div>
             <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">AI-Powered Resume Editor</span>
          </div>
        </div>
      </div>
      
      {/* Center: Tools & Navigation (Hidden on Mobile) */}
      <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md shadow-inner relative">
         <LanguageSelector 
            currentLang={language} 
            onLanguageChange={(lang) => {
              translateData(lang);
              addToast('Idioma cambiado / Language changed', 'success');
            }} 
          />
          
          <div className="w-px h-4 bg-white/10 mx-1"></div>

          {/* Tools Menu Trigger & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                  setIsToolsMenuOpen(!isToolsMenuOpen);
                  setIsSaveMenuOpen(false); // Close other menu
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 group ${
                  isToolsMenuOpen 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Command size={14} className={isToolsMenuOpen ? 'text-white' : 'group-hover:text-indigo-400 transition-colors'} />
              <span>Herramientas</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isToolsMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isToolsMenuOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-transparent cursor-default" onClick={(e) => { e.stopPropagation(); setIsToolsMenuOpen(false); }}></div>
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={dropdownClasses}
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
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-4 bg-white/10 mx-1"></div>

          {/* Save / Load Trigger & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                  setIsSaveMenuOpen(!isSaveMenuOpen);
                  setIsToolsMenuOpen(false); // Close other menu
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isSaveMenuOpen 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Cloud size={14} className={isSaveMenuOpen ? 'animate-pulse' : ''} />
              <span>Guardar / Cargar</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isSaveMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSaveMenuOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-transparent cursor-default" onClick={(e) => { e.stopPropagation(); setIsSaveMenuOpen(false); }}></div>
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={dropdownClasses}
                    >
                        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gestión de Archivos</span>
                            <Cloud size={14} className="text-indigo-400" />
                        </div>
                        
                        <div className="p-2 space-y-1">
                            <button 
                                onClick={() => { setIsCloudModalOpen(true); setIsSaveMenuOpen(false); }}
                                className={dropdownItemClasses}
                            >
                                <div className={dropdownIconContainerClasses("text-indigo-400", "bg-indigo-500/10 group-hover:bg-indigo-500/20")}>
                                    <Cloud size={16} />
                                </div>
                                <div>
                                    <span className="block font-bold group-hover:text-indigo-300 transition-colors">Guardar en la Nube</span>
                                    <span className="text-[10px] text-slate-500">Google Drive, Dropbox...</span>
                                </div>
                            </button>

                            <button 
                                onClick={handleExport}
                                className={dropdownItemClasses}
                            >
                                <div className={dropdownIconContainerClasses("text-emerald-400", "bg-emerald-500/10 group-hover:bg-emerald-500/20")}>
                                    <Download size={16} />
                                </div>
                                <div>
                                    <span className="block font-bold group-hover:text-emerald-300 transition-colors">Descargar Respaldo JSON</span>
                                    <span className="text-[10px] text-slate-500">Para guardar en tu PC</span>
                                </div>
                            </button>

                            <button 
                                onClick={handleImportClick}
                                className={dropdownItemClasses}
                            >
                                <div className={dropdownIconContainerClasses("text-blue-400", "bg-blue-500/10 group-hover:bg-blue-500/20")}>
                                    <Upload size={16} />
                                </div>
                                <div>
                                    <span className="block font-bold group-hover:text-blue-300 transition-colors">Importar Respaldo / PDF</span>
                                    <span className="text-[10px] text-slate-500">Restaura tu progreso</span>
                                </div>
                            </button>
                        </div>
                        <div className="p-3 bg-white/5 border-t border-white/5 text-center">
                            <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                                <Sparkles size={10} className="text-yellow-500" />
                                Autoguardado activado
                            </p>
                        </div>
                    </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Reset Button (Subtle) */}
        <button 
          onClick={handleReset}
          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-300 hidden sm:flex"
          title={t.reset}
        >
          <Trash2 size={18} />
        </button>

        {/* Primary Download Button */}
        <button 
          onClick={onDownload}
          className="group relative px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-full overflow-hidden shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <div className="relative flex items-center gap-2">
                <Download size={16} />
                <span>{t.downloadPDF || "Descargar PDF"}</span>
            </div>
        </button>

        {/* User Profile */}
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center cursor-pointer hover:border-indigo-500/50 transition-colors relative group">
            <User size={16} className="text-slate-300 group-hover:text-white transition-colors" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f1428] rounded-full"></div>
        </div>
      </div>



      {/* Hidden File Input */}
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
    </header>
  );
};

export default Header;