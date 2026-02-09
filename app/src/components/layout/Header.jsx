import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { 
  Globe, Trash2, PanelLeftOpen, FileText, Download, Upload, 
  Languages, Cloud, ChevronDown, Save, User, Settings, Sparkles, Command,
  Palette, Type, Layout, Grid
} from 'lucide-react';
import LanguageSelector from '../ui/LanguageSelector';
import { extractTextFromPDF } from '../../utils/pdfImporter';
import { parseCVText } from '../../utils/cvParser';

import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onDownload }) => {
  const { language, resetCVData, isSidebarOpen, toggleSidebar, cvData, loadCVData, translateData } = useCVStore();
  const { addToast } = useUIStore();
  const t = TRANSLATIONS[language];
  const fileInputRef = React.useRef(null);
  
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
    } catch (error) {
      console.error(error);
      addToast('Error al exportar datos', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
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
  // eslint-disable-next-line no-unused-vars
  const dropdownClasses = "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-[#0f1428]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden ring-1 ring-white/5 origin-top";
  // eslint-disable-next-line no-unused-vars
  const dropdownItemClasses = "w-full text-left px-3 py-3 hover:bg-white/5 rounded-xl text-xs font-medium text-slate-200 flex items-center gap-3 transition-all group";
  // eslint-disable-next-line no-unused-vars
  const dropdownIconContainerClasses = (colorClass, bgClass) => `p-2 ${bgClass} ${colorClass} rounded-lg group-hover:scale-110 transition-all`;

  return (
    <header className="h-[72px] flex items-center justify-between px-6 absolute top-0 right-0 left-0 z-50 transition-all duration-300 backdrop-blur-[14px] shadow-lg shadow-black/20"
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
        
        <div className="flex items-center gap-8 group cursor-pointer">
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
    </header>
  );
};

export default Header;