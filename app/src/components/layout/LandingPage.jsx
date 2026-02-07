import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FilePlus2, FolderOpen, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Users, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useCVStore } from '../../store/cvStore';
import { extractTextFromPDF } from '../../utils/pdfImporter';
import { parseCVText } from '../../utils/cvParser';
import BackgroundAmbience from './BackgroundAmbience';

const LandingPage = () => {
  const { appTheme, addToast } = useUIStore();
  const { resetCVData, loadCVData } = useCVStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleCreateNew = () => {
    resetCVData();
    navigate('/templates');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (json.cvData) {
              loadCVData(json.cvData);
          } else {
              loadCVData(json);
          }
          addToast('CV cargado exitosamente', 'success');
          navigate('/editor');
        } catch (error) {
          console.error("Error parsing JSON:", error);
          addToast("Error al leer el archivo JSON", 'error');
        }
      };
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      try {
        addToast('Analizando PDF... Espere un momento.', 'info');
        const text = await extractTextFromPDF(file);
        const parsedData = parseCVText(text);
        
        loadCVData(parsedData);
        addToast('PDF Importado. Revisa los datos extraídos.', 'success');
        navigate('/editor');
      } catch (error) {
        console.error(error);
        addToast('Error al importar PDF: ' + error.message, 'error');
      }
    } else {
      addToast("Formato no soportado. Usa JSON o PDF.", 'warning');
    }
    
    event.target.value = '';
  };

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

  // Animation variants for floating particles
  const particleVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 5 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-500/30" data-theme={appTheme}>
      
      {/* Background Ambience */}
      <BackgroundAmbience />

      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 max-w-5xl mx-auto flex flex-col items-center"
        >
          <div className="relative w-28 h-28 mb-10 group">
             <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
             <img src="/logo.svg" alt="CV Builder Pro Logo" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            Crea un currículum que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">te contraten</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-light">
            Plataforma inteligente para diseñar currículums de alto impacto. <br className="hidden md:block" />
            <span className="text-slate-300 font-normal">Supera filtros ATS. Destaca tu talento. Consigue la entrevista.</span>
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 w-full mb-24 px-4">
          
          {/* Card 1: Create New */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onClick={handleCreateNew}
            className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl hover:shadow-blue-900/20 hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/30 group-hover:scale-110 transition-transform duration-300">
              <FilePlus2 size={32} className="text-white" />
            </div>
            
            <h2 className="relative z-10 text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
              Crear desde cero
            </h2>
            <p className="relative z-10 text-slate-400 mb-8 leading-relaxed text-lg">
              Diseña un CV estratégico con plantillas premium validadas por expertos. Estructura perfecta para cualquier nivel de experiencia.
            </p>

            <ul className="relative z-10 space-y-4 mb-10">
              {benefitsNew.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <div className="mt-1 p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-auto w-full py-4 bg-white/10 group-hover:bg-blue-600 rounded-xl text-center font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/5 group-hover:border-transparent">
              Comenzar ahora <ArrowRight size={18} />
            </div>
          </motion.button>

          {/* Card 2: Import Existing */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={handleImportClick}
            className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl hover:shadow-purple-900/20 hover:border-purple-500/30 hover:-translate-y-2 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-900/30 group-hover:scale-110 transition-transform duration-300">
              <FolderOpen size={32} className="text-white" />
            </div>

            <h2 className="relative z-10 text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
              Mejorar mi CV actual
            </h2>
            <p className="relative z-10 text-slate-400 mb-8 leading-relaxed text-lg">
              Sube tu PDF y nuestra IA lo transformará en una versión profesional, optimizada y visualmente impactante.
            </p>

            <ul className="relative z-10 space-y-4 mb-10">
              {benefitsExisting.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <div className="mt-1 p-0.5 rounded-full bg-purple-500/20 text-purple-400">
                    <Sparkles size={16} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-auto w-full py-4 bg-white/10 group-hover:bg-purple-600 rounded-xl text-center font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/5 group-hover:border-transparent">
              Optimizar con IA <ArrowRight size={18} />
            </div>
          </motion.button>

        </div>

        {/* Footer / Trust Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-8 pb-10"
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500 font-medium text-sm tracking-wide uppercase">
            <div className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-default">
              <ShieldCheck size={20} className="text-indigo-500" />
              <span>100% Profesional</span>
            </div>
            <div className="flex items-center gap-3 hover:text-blue-400 transition-colors cursor-default">
              <Users size={20} className="text-blue-500" />
              <span>Validado por RRHH</span>
            </div>
            <div className="flex items-center gap-3 hover:text-purple-400 transition-colors cursor-default">
              <TrendingUp size={20} className="text-purple-500" />
              <span>Alta Conversión</span>
            </div>
          </div>

          {/* Key Message */}
          <div className="max-w-2xl mx-auto pt-10 border-t border-white/5 w-full">
             <p className="text-slate-500 italic font-medium text-lg">
               "No es solo un documento. Es tu próxima gran oportunidad."
             </p>
          </div>

        </motion.div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,.pdf"
        className="hidden"
      />
    </div>
  );
};

export default LandingPage;
