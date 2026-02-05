import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { motion } from 'framer-motion';
import { Type, Droplet } from 'lucide-react';

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

const DesignControls = () => {
  const { design, updateDesign, language, themeColor, setThemeColor } = useCVStore();
  const t = TRANSLATIONS[language];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 right-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-50 w-72 print:hidden max-h-[80vh] overflow-y-auto"
    >
      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Droplet className="text-indigo-600" size={18} />
        Colores
      </h3>

      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setThemeColor(color.value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                themeColor === color.value ? 'border-indigo-600 scale-110' : 'border-transparent'
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
              className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
            />
            <div className="absolute inset-0 rounded-full border-2 border-gray-200 pointer-events-none group-hover:border-indigo-400" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />

      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Type className="text-indigo-600" size={18} />
        Ajustes de Diseño
      </h3>

      <div className="space-y-4">
        {/* Top Margin */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500 flex justify-between">
            <span>Mover contenido (Top)</span>
            <span>{design.marginTop}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="200"
            step="5"
            value={design.marginTop}
            onChange={(e) => updateDesign({ marginTop: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Section Gap */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500 flex justify-between">
            <span>Espacio entre secciones</span>
            <span>{design.sectionGap}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="50"
            step="2"
            value={design.sectionGap}
            onChange={(e) => updateDesign({ sectionGap: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

         {/* Font Size */}
         <div className="space-y-1">
          <label className="text-xs text-gray-500 flex justify-between">
            <span>Tamaño Fuente Base</span>
            <span>{design.fontSize}px</span>
          </label>
          <input
            type="range"
            min="12"
            max="20"
            step="1"
            value={design.fontSize}
            onChange={(e) => updateDesign({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DesignControls;
