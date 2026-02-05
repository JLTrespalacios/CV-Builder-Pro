import React from 'react';
import { motion } from 'framer-motion';
import { FilePlus2, FolderOpen, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const LandingPage = ({ onCreateNew, onImportExisting }) => {
  const { appTheme } = useUIStore();

  const benefitsNew = [
    "Diseños modernos y profesionales",
    "Enfoque en logros, no solo funciones",
    "Estructura validada por reclutadores",
    "Ideal para destacar en cualquier industria"
  ];

  const benefitsExisting = [
    "Mejora automática de redacción y estructura",
    "Optimización para filtros ATS",
    "Imagen profesional y competitiva",
    "Ahorra tiempo y aumenta tus oportunidades"
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans" data-theme={appTheme}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Crea un currículum que <span className="text-blue-600">te contraten</span>, no que ignoren
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Diseñamos currículums profesionales que destacan tu talento, superan filtros ATS y proyectan una imagen de éxito real ante reclutadores.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 w-full mb-20">
          
          {/* Card 1: Create New */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={onCreateNew}
            className="group relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300">
              <FilePlus2 size={32} className="text-blue-600 group-hover:text-white transition-colors" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              Crea tu currículum profesional desde cero
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Construye un CV estratégico paso a paso con plantillas diseñadas por expertos en selección. Optimizado para reclutadores, sistemas ATS y procesos reales de contratación.
            </p>

            <ul className="space-y-3 mb-10">
              {benefitsNew.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 text-sm md:text-base">
                  <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto w-full py-4 bg-slate-50 group-hover:bg-blue-600 rounded-xl text-center font-bold text-slate-700 group-hover:text-white transition-all flex items-center justify-center gap-2">
              Crear mi currículum ahora <ArrowRight size={18} />
            </div>
          </motion.button>

          {/* Card 2: Import Existing */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={onImportExisting}
            className="group relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-300">
              <FolderOpen size={32} className="text-emerald-600 group-hover:text-white transition-colors" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
              Convierte tu currículum actual en uno que sí vende tu perfil
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Sube tu CV y lo transformamos en una versión más clara, más profesional y mucho más atractiva para los reclutadores.
            </p>

            <ul className="space-y-3 mb-10">
              {benefitsExisting.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 text-sm md:text-base">
                  <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto w-full py-4 bg-slate-50 group-hover:bg-emerald-600 rounded-xl text-center font-bold text-slate-700 group-hover:text-white transition-all flex items-center justify-center gap-2">
              Optimizar mi currículum <ArrowRight size={18} />
            </div>
          </motion.button>

        </div>

        {/* Footer / Trust Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-slate-400 font-medium text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-slate-400" />
              <span>Profesional</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-slate-400" />
              <span>Diseñado para contratación real</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-slate-400" />
              <span>Orientado a resultados</span>
            </div>
          </div>

          {/* Key Message */}
          <div className="max-w-2xl mx-auto pt-8 border-t border-slate-200 w-full">
             <p className="text-slate-500 italic font-medium text-lg">
               "Aquí no creas un CV bonito. Creas un currículum que comunica valor, genera confianza y abre puertas."
             </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
