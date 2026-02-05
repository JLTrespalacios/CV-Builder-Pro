import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileText, FileType, Star, Sparkles, TrendingUp, X } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { generateWord } from '../../utils/wordGenerator';
import { TRANSLATIONS } from '../../constants/translations';

const templates = [
  { id: 'MinimalWhite', name: 'Budapest', color: 'bg-white border border-slate-200', description: 'Limpio y claro', badge: 'Más elegido', badgeColor: 'bg-emerald-500' },
  { id: 'SwissGrid', name: 'Chicago', color: 'bg-red-600', description: 'Ordenado y suizo', badge: 'Recomendado', badgeColor: 'bg-amber-500' },
  { id: 'ExecutiveGray', name: 'Rotterdam', color: 'bg-gray-700', description: 'Sobrio y ejecutivo', badge: 'Nuevo', badgeColor: 'bg-blue-500' },
  { id: 'CorporateBlue', name: 'Riga', color: 'bg-blue-900', description: 'Profesional y serio' },
  { id: 'ModernDark', name: 'Lima', color: 'bg-slate-900', description: 'Elegante y moderno' },
  { id: 'IvyLeague', name: 'Sydney', color: 'bg-white border-2 border-slate-900', description: 'Clásico prestigioso' },
  { id: 'TechGamer', name: 'Cali', color: 'bg-black border border-green-500', description: 'Audaz y digital' },
  { id: 'AcademicAPA', name: 'Tokyo', color: 'bg-stone-50 border border-stone-200', description: 'Estándar APA' },
];

const TemplateSelectionOverlay = ({ onSelect, onClose, isModal = false }) => {
  const { setTemplate, cvData, language } = useCVStore();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const t = TRANSLATIONS[language];

  const handleSelect = (templateId) => {
    setTemplate(templateId);
    onSelect();
  };

  const handleDownloadSample = async (e, type, templateId) => {
    e.stopPropagation();
    if (type === 'word') {
      // Create a temporary CV data with the selected template style implied? 
      // Actually generateWord takes cvData. We'll use current cvData (even if empty) or dummy data.
      // For now, let's use the current store data.
      try {
        await generateWord(cvData, t);
      } catch (error) {
        console.error("Error generating word:", error);
      }
    } else {
      // PDF download is usually handled via print. 
      // We can't easily generate PDF from here without rendering the component.
      // We'll just alert or log for now.
      alert("Para descargar en PDF, selecciona la plantilla y usa el botón de descarga en el editor.");
    }
  };

  return (
    <div className={`w-full min-h-screen bg-slate-50 flex flex-col ${isModal ? 'fixed inset-0 z-50 overflow-y-auto' : 'relative'}`}>
      
      {isModal && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:bg-slate-100 z-50 transition-colors"
        >
          <X size={24} className="text-slate-500" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Elige tu plantilla ideal</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Todas nuestras plantillas son gratuitas y están optimizadas para sistemas de seguimiento de candidatos (ATS).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Badge */}
              {template.badge && (
                <div className={`absolute top-0 right-0 ${template.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20 shadow-sm`}>
                  {template.badge}
                </div>
              )}

              {/* Preview Area (Abstract Representation) */}
              <div className="relative aspect-[1/1.4] w-full bg-slate-100 overflow-hidden p-4">
                <div className={`w-full h-full shadow-sm ${template.color} rounded flex flex-col p-2 relative`}>
                   {/* Abstract Layout Lines */}
                   <div className="w-1/3 h-2 bg-current opacity-20 mb-2 rounded-sm"></div>
                   <div className="w-full h-[1px] bg-current opacity-10 mb-2"></div>
                   <div className="flex gap-2 mb-2">
                     <div className="w-1/4 h-16 bg-current opacity-10 rounded-sm"></div>
                     <div className="flex-1 space-y-1">
                        <div className="w-full h-1 bg-current opacity-10 rounded-sm"></div>
                        <div className="w-3/4 h-1 bg-current opacity-10 rounded-sm"></div>
                        <div className="w-5/6 h-1 bg-current opacity-10 rounded-sm"></div>
                     </div>
                   </div>
                   <div className="flex-1 space-y-2 mt-2">
                      <div className="w-full h-1 bg-current opacity-10 rounded-sm"></div>
                      <div className="w-full h-1 bg-current opacity-10 rounded-sm"></div>
                      <div className="w-2/3 h-1 bg-current opacity-10 rounded-sm"></div>
                   </div>
                </div>

                {/* Hover Overlay */}
                <AnimatePresence>
                  {hoveredTemplate === template.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-10"
                    >
                      <button 
                        onClick={() => handleSelect(template.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                      >
                        Seleccionar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Info */}
              <div className="p-4 bg-white flex items-center justify-between border-t border-slate-100 mt-auto">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{template.name}</h3>
                  {/* <p className="text-xs text-slate-400">{template.description}</p> */}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleDownloadSample(e, 'word', template.id)}
                    className="px-2 py-1 text-[10px] font-bold text-slate-500 border border-slate-200 rounded hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                    title="Disponible en Word"
                  >
                    WORD
                  </button>
                  <button 
                     onClick={(e) => handleDownloadSample(e, 'pdf', template.id)}
                    className="px-2 py-1 text-[10px] font-bold text-slate-500 border border-slate-200 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    title="Disponible en PDF"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionOverlay;
