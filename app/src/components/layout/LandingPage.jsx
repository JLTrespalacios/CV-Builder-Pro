import React from 'react';
import { motion } from 'framer-motion';
import { FilePlus2, FolderOpen, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const LandingPage = ({ onCreateNew, onImportExisting }) => {
  const { appTheme } = useUIStore();

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden" data-theme={appTheme}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          ¿Cómo quieres hacer tu <span className="text-blue-600">currículum</span>?
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Elige la opción que mejor se adapte a ti y comienza a destacar profesionalmente.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        {/* Option 1: Create New */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={onCreateNew}
          className="group relative bg-white rounded-3xl p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col items-center text-center md:items-start md:text-left"
        >
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <FilePlus2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
            Crear un nuevo currículum
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Te ayudaremos a crear tu currículum paso a paso con nuestras plantillas profesionales.
          </p>
          <div className="mt-auto flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
            Empezar ahora <ArrowRight size={20} className="ml-2" />
          </div>
        </motion.button>

        {/* Option 2: Import Existing */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={onImportExisting}
          className="group relative bg-white rounded-3xl p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col items-center text-center md:items-start md:text-left"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <FolderOpen size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
            Ya tengo un currículum
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Readaptaremos y añadiremos tu información para que no tengas que hacerlo manualmente.
          </p>
          <div className="mt-auto flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
            Subir archivo <ArrowRight size={20} className="ml-2" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPage;
