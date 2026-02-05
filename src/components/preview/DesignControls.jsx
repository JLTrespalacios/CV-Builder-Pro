import React, { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Droplet, Layout, ChevronUp, ChevronDown, X } from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Azul Profesional', value: '#2563eb' },
  { name: 'Azul Marino', value: '#1e3a8a' },
  { name: 'Azul Cielo', value: '#0ea5e9' },
  { name: 'Negro Clásico', value: '#000000' },
  { name: 'Gris Oscuro', value: '#374151' },
  { name: 'Gris Medio', value: '#6b7280' },
  { name: 'Gris Plata', value: '#9ca3af' },
  { name: 'Blanco Puro', value: '#ffffff' },
  { name: 'Violeta', value: '#7c3aed' },
  { name: 'Teal', value: '#0d9488' },
];

const FONT_FAMILIES = [
  { name: 'Inter (Moderno)', value: 'Inter, sans-serif' },
  { name: 'Roboto (Estándar)', value: 'Roboto, sans-serif' },
  { name: 'Open Sans (Limpio)', value: '"Open Sans", sans-serif' },
  { name: 'Lato (Amigable)', value: 'Lato, sans-serif' },
  { name: 'Montserrat (Geométrico)', value: 'Montserrat, sans-serif' },
  { name: 'Merriweather (Serif)', value: 'Merriweather, serif' },
  { name: 'Playfair Display (Elegante)', value: '"Playfair Display", serif' },
  { name: 'Lora (Clásico)', value: 'Lora, serif' },
  { name: 'Roboto Mono (Técnico)', value: '"Roboto Mono", monospace' },
];

const DesignControls = () => {
  const { design, updateDesign, language, themeColor, setThemeColor } = useCVStore();
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[language];

  return (
    <div className="relative z-50 print:hidden">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 font-medium text-xs ${
          isOpen 
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
            : 'bg-[var(--bg-panel)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm'
        }`}
        title="Herramientas de Diseño"
      >
        <Layout size={16} />
        <span className="hidden sm:inline">Herramientas</span>
        {isOpen ? <X size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-transparent" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 8 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 w-80 overflow-hidden flex flex-col origin-top-right z-50 ring-1 ring-black/5"
            >
              <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar space-y-8">
                {/* Colors Section */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Droplet size={12} className="text-indigo-500" />
                    Paleta de Colores
                  </h3>
                  <div className="grid grid-cols-5 gap-3">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setThemeColor(color.value)}
                        className={`group relative w-full aspect-square rounded-full transition-all duration-300 ${
                          themeColor === color.value 
                            ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' 
                            : 'hover:scale-110 hover:shadow-lg ring-1 ring-slate-200'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {themeColor === color.value && (
                          <motion.div 
                            layoutId="activeColor"
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                    <div className="relative group w-full aspect-square">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        title="Color Personalizado"
                      />
                      <div className={`w-full h-full rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50 ${themeColor && !PRESET_COLORS.some(c => c.value === themeColor) ? 'bg-indigo-50 border-indigo-500' : ''}`}>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography Section */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Type size={12} className="text-indigo-500" />
                    Tipografía
                  </h3>
                  
                  {/* Font Family Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">Fuente Principal</label>
                    <div className="relative">
                      <select 
                        value={design.fontFamily || 'Inter, sans-serif'} 
                        onChange={(e) => updateDesign({ fontFamily: e.target.value })}
                        className="w-full text-sm py-2.5 pl-3 pr-8 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white hover:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer text-slate-700"
                        style={{ fontFamily: design.fontFamily }}
                      >
                        {FONT_FAMILIES.map((font) => (
                          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Font Color Picker */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-slate-700">Color de Texto</label>
                    <div className="flex items-center gap-3">
                       <div className="relative group w-10 h-10 rounded-full overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:scale-105 transition-transform">
                         <input 
                           type="color" 
                           value={design.fontColor || '#334155'}
                           onChange={(e) => updateDesign({ fontColor: e.target.value })}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-0 border-0 z-10"
                           title="Cambiar color de texto"
                         />
                         <div 
                           className="w-full h-full"
                           style={{ backgroundColor: design.fontColor || '#334155' }}
                         />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs font-medium text-slate-600">Color Actual</span>
                          <span className="text-[10px] text-slate-400 font-mono uppercase">{design.fontColor || '#334155'}</span>
                       </div>
                    </div>
                  </div>

                  {/* Font Size Slider */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-700">Tamaño de Texto</label>
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-100">
                        {design.fontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      step="1"
                      value={design.fontSize}
                      onChange={(e) => updateDesign({ fontSize: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
                    />
                    <div className="flex justify-between text-[10px] font-medium text-slate-400 px-1">
                      <span>Compacto</span>
                      <span>Amplio</span>
                    </div>
                  </div>
                </div>

                {/* Layout Section */}
                <div className="space-y-4">
                   <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Layout size={12} className="text-indigo-500" />
                    Distribución
                  </h3>

                  {/* Top Margin */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-700">Margen Superior</label>
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-100">
                        {design.marginTop}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={design.marginTop}
                      onChange={(e) => updateDesign({ marginTop: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
                    />
                  </div>

                  {/* Section Gap */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-700">Espaciado Secciones</label>
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-100">
                        {design.sectionGap}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="2"
                      value={design.sectionGap}
                      onChange={(e) => updateDesign({ sectionGap: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-200/60 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                  Los cambios se guardan automáticamente
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignControls;
