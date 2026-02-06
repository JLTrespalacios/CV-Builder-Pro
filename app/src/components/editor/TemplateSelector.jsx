import React, { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { TEMPLATE_CONFIG } from '../../constants/templatesConfig';
import { LayoutTemplate, ChevronDown, Check, Palette, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROFESSIONAL_COLORS = [
  { value: '#0f172a', name: 'Director Tech (Slate)', class: 'bg-slate-900' },
  { value: '#172554', name: 'CEO Navy (Azul Profundo)', class: 'bg-blue-950' },
  { value: '#111827', name: 'Boardroom (Negro Suave)', class: 'bg-gray-900' },
  { value: '#064e3b', name: 'Senior Management (Verde)', class: 'bg-emerald-900' },
  { value: '#7f1d1d', name: 'Executive Power (Vino)', class: 'bg-red-900' },
  { value: '#0e7490', name: 'Lead Developer (Cian)', class: 'bg-cyan-700' },
  { value: '#4338ca', name: 'Startup Founder (Indigo)', class: 'bg-indigo-700' },
];

const TemplateSelector = () => {
  const { selectedTemplate, setTemplate, themeColor, setThemeColor, language } = useCVStore();
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);

  // Find current template object from config, fallback to first if not found
  const currentTemplate = TEMPLATE_CONFIG.find(t => t.id === selectedTemplate) || TEMPLATE_CONFIG[0];

  return (
    <div className="p-6 lg:p-8 min-w-[350px] max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
          <LayoutTemplate size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Personalización</h2>
          <p className="text-sm text-slate-500">Define el estilo de tu CV</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Template Section */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-slate-200/50 relative z-20">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              Plantilla
            </h3>
          </div>
          
          <div className="p-5">
            <div className="relative">
              <button 
                className="w-full flex items-center justify-between px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-left hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all group"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg shadow-sm flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: currentTemplate?.colorHex?.accent || '#334155' }}
                  ></div>
                  <div>
                    <span className="block font-bold text-slate-700 text-base">{currentTemplate?.name || 'Seleccionar Plantilla'}</span>
                    <span className="block text-xs text-slate-400 font-medium truncate max-w-[180px]">{currentTemplate?.description || ''}</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-slate-400 group-hover:text-indigo-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl z-50 max-h-[300px] overflow-y-auto custom-scrollbar ring-1 ring-black/5"
                  >
                    <div className="p-2 grid gap-1">
                      {TEMPLATE_CONFIG.map((template) => (
                        <button 
                          key={template.id}
                          className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-all duration-200 group ${
                            selectedTemplate === template.id 
                              ? 'bg-indigo-50 ring-1 ring-indigo-100' 
                              : 'hover:bg-slate-50'
                          }`}
                          onClick={() => {
                            setTemplate(template.id);
                            setIsOpen(false);
                          }}
                        >
                          <div 
                            className="w-8 h-8 rounded-md shadow-sm border border-black/5 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: template.colorHex?.accent || '#334155' }}
                          ></div>
                          <div className="flex-1">
                            <span className={`block text-sm font-semibold ${selectedTemplate === template.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                              {template.name}
                            </span>
                            <span className="block text-[10px] text-slate-400 truncate max-w-[200px]">{template.description}</span>
                          </div>
                          {selectedTemplate === template.id && (
                            <motion.div layoutId="check">
                              <Check size={16} className="text-indigo-600" />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Color Section */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden relative z-10">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} className="text-indigo-500" />
              Acento Principal
            </h3>
          </div>
          
          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 mb-4">Selecciona un tono profesional:</p>
            <div className="grid grid-cols-4 gap-3">
              {PROFESSIONAL_COLORS.map((color) => (
                <button 
                  key={color.value}
                  className={`group relative w-full aspect-square rounded-full transition-all duration-300 ${
                    themeColor === color.value 
                      ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105' 
                      : 'hover:scale-105 hover:shadow-lg ring-1 ring-slate-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  onClick={() => setThemeColor(color.value)}
                >
                  {themeColor === color.value && (
                    <motion.div 
                      layoutId="activeColorCheck"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                    </motion.div>
                  )}
                </button>
              ))}
              
              {/* Custom Color Button Indicator */}
              <div className="relative group w-full aspect-square">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  title="Color Personalizado"
                />
                <div className={`w-full h-full rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50 ${themeColor && !PROFESSIONAL_COLORS.some(c => c.value === themeColor) ? 'bg-indigo-50 border-indigo-500' : ''}`}>
                   <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
