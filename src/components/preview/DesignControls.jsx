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
        <span className="hidden sm:inline">Diseño</span>
        {isOpen ? <X size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 8 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 w-80 overflow-hidden flex flex-col origin-top-right"
          >
            <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Colors Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Droplet size={14} />
                  Colores
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setThemeColor(color.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        themeColor === color.value ? 'border-indigo-600 scale-110 shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                  <div className="relative group">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-7 h-7 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-gray-200 pointer-events-none group-hover:border-indigo-400" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* Typography Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Type size={14} />
                  Tipografía
                </h3>
                
                {/* Font Family Selector */}
                <div className="space-y-3 mb-4">
                  <label className="text-xs text-gray-600 block font-medium">Fuente</label>
                  <select 
                    value={design.fontFamily || 'Inter, sans-serif'} 
                    onChange={(e) => updateDesign({ fontFamily: e.target.value })}
                    className="w-full text-sm p-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    style={{ fontFamily: design.fontFamily }}
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size Slider */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 flex justify-between font-medium">
                    <span>Tamaño Base</span>
                    <span className="bg-indigo-50 text-indigo-700 px-1.5 rounded text-[10px]">{design.fontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    step="1"
                    value={design.fontSize}
                    onChange={(e) => updateDesign({ fontSize: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 px-1">
                    <span>A-</span>
                    <span>A+</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* Layout Section */}
              <div className="space-y-4">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layout size={14} />
                  Espaciado
                </h3>

                {/* Top Margin */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 flex justify-between font-medium">
                    <span>Margen Superior</span>
                    <span className="bg-indigo-50 text-indigo-700 px-1.5 rounded text-[10px]">{design.marginTop}px</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={design.marginTop}
                    onChange={(e) => updateDesign({ marginTop: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Section Gap */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 flex justify-between font-medium">
                    <span>Separación Secciones</span>
                    <span className="bg-indigo-50 text-indigo-700 px-1.5 rounded text-[10px]">{design.sectionGap}px</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="2"
                    value={design.sectionGap}
                    onChange={(e) => updateDesign({ sectionGap: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignControls;
