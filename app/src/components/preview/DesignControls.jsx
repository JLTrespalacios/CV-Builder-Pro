import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { Droplet, Layout, ChevronDown, Type } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const { updateDesign, themeColor, setThemeColor, design } = useCVStore();

  return (
    <div className="space-y-8 text-slate-200">
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
                  : 'hover:scale-110 hover:shadow-lg ring-1 ring-slate-600'
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
            <div className={`w-full h-full rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center transition-all group-hover:border-indigo-400 group-hover:bg-indigo-500/10 ${themeColor && !PRESET_COLORS.some(c => c.value === themeColor) ? 'bg-indigo-500/10 border-indigo-500' : ''}`}>
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
          <label className="text-xs font-semibold text-slate-400">Fuente Principal</label>
          <div className="relative">
            <select 
              value={design.fontFamily || 'Inter, sans-serif'} 
              onChange={(e) => updateDesign({ fontFamily: e.target.value })}
              className="w-full text-sm py-2.5 pl-3 pr-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer text-slate-200"
              style={{ fontFamily: design.fontFamily }}
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }} className="bg-[#0f1428] text-slate-200">
                  {font.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Font Color Picker */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-400">Color de Texto</label>
          <div className="flex items-center gap-3">
              <div className="relative group w-10 h-10 rounded-full overflow-hidden border border-white/10 cursor-pointer shadow-sm hover:scale-105 transition-transform">
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
                <span className="text-xs font-medium text-slate-500">Color Actual</span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">{design.fontColor || '#334155'}</span>
              </div>
          </div>
        </div>

        {/* Name Color Picker */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-400">Color del Nombre</label>
          <div className="flex items-center gap-3">
              <div className="relative group w-10 h-10 rounded-full overflow-hidden border border-white/10 cursor-pointer shadow-sm hover:scale-105 transition-transform">
                <input 
                  type="color" 
                  value={design.nameColor || themeColor || '#2563eb'}
                  onChange={(e) => updateDesign({ nameColor: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-0 border-0 z-10"
                  title="Cambiar color del nombre"
                />
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: design.nameColor || themeColor || '#2563eb' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500">Nombre</span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">{design.nameColor || 'Auto'}</span>
              </div>
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-400">Tamaño de Texto</label>
            <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-500/20">
              {design.fontSize}px
            </span>
          </div>
          
          {/* Presets Profesionales */}
          <div className="grid grid-cols-4 gap-2 mb-2">
              {[
                { label: 'S', size: 12, desc: 'Compacto' },
                { label: 'M', size: 14, desc: 'Estándar' },
                { label: 'L', size: 16, desc: 'Lectura' },
                { label: 'XL', size: 18, desc: 'Amplio' }
              ].map((preset) => (
                <button
                  key={preset.size}
                  onClick={() => updateDesign({ fontSize: preset.size })}
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-medium transition-all ${
                    design.fontSize === preset.size
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:border-indigo-500/50 hover:text-indigo-400'
                  }`}
                  title={`Tamaño ${preset.desc} (${preset.size}px)`}
                >
                  {preset.label}
                </button>
              ))}
          </div>

          <input
            type="range"
            min="11"
            max="24"
            step="1"
            value={design.fontSize}
            onChange={(e) => updateDesign({ fontSize: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />
        </div>

        {/* Line Height Control */}
        <div className="space-y-3 pt-2 border-t border-white/10 mt-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-400">Espaciado de Texto</label>
            <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-500/20">
              {design.lineHeight || 1.5}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { label: 'Compacto', val: 1.2 },
                { label: 'Normal', val: 1.5 },
                { label: 'Aireado', val: 1.8 }
              ].map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => updateDesign({ lineHeight: preset.val })}
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-medium transition-all ${
                    (design.lineHeight || 1.5) === preset.val
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:border-indigo-500/50 hover:text-indigo-400'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
          </div>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.1"
            value={design.lineHeight || 1.5}
            onChange={(e) => updateDesign({ lineHeight: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />
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
            <label className="text-xs font-semibold text-slate-400">Margen Superior</label>
            <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-500/20">
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
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />
        </div>

        {/* Section Gap */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-400">Espaciado Secciones</label>
            <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md text-[10px] font-bold border border-indigo-500/20">
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
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignControls;