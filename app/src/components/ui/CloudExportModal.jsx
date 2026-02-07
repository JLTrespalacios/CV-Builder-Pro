import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Cloud, X, Share2, Smartphone, Monitor, Download, HardDrive } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';

const CloudExportModal = ({ isOpen, onClose }) => {
  const { cvData } = useCVStore();
  const { addToast } = useUIStore();
  const [isSharing, setIsSharing] = useState(false);

  // Generate the file blob
  const getFile = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    return new File([dataStr], `cv-backup-${new Date().toISOString().slice(0, 10)}.json`, {
      type: "application/json",
    });
  };

  const handleNativeShare = async () => {
    setIsSharing(true);
    try {
      const file = getFile();
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Respaldo de CV',
          text: 'Aquí tienes una copia de seguridad de tu CV.',
          files: [file]
        });
        addToast('¡Archivo compartido exitosamente!', 'success');
        onClose();
      } else {
        throw new Error('Web Share API no soporta archivos en este dispositivo.');
      }
    } catch (error) {
      console.error(error);
      // Fallback: Just download
      addToast('Tu dispositivo no soporta compartir archivos directos. Descargando...', 'info');
      handleDownload();
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = () => {
    try {
      const file = getFile();
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast('Archivo descargado. Ahora puedes subirlo a tu nube preferida.', 'success');
      onClose();
    } catch (error) {
      console.error(error);
      addToast('Error al generar el archivo', 'error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
              <Cloud className="absolute -right-6 -top-6 text-white/10 w-32 h-32 rotate-12" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="relative z-10">
                <div className="p-3 bg-white/20 w-fit rounded-xl mb-4 backdrop-blur-md">
                  <Cloud size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Guardar en la Nube</h2>
                <p className="text-blue-100 text-sm">Respalda tu progreso y accede desde cualquier lugar.</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>¿Cómo funciona?</strong> <br/>
                  Generaremos un archivo de respaldo (.json) que puedes guardar en <strong>Google Drive, iCloud, Dropbox</strong> o enviarte por correo.
                </p>
              </div>

              <div className="space-y-3">
                {/* Option 1: Mobile/Native Share */}
                <button
                  onClick={handleNativeShare}
                  disabled={isSharing}
                  className="w-full group relative flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 text-left"
                >
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-700">Usar App de Nube</h3>
                    <p className="text-xs text-slate-500">Google Drive, Dropbox, OneDrive, Email...</p>
                  </div>
                  <Share2 className="absolute right-4 text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
                </button>

                {/* Option 2: Manual Download */}
                <button
                  onClick={handleDownload}
                  className="w-full group relative flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-300 text-left"
                >
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <HardDrive size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-emerald-700">Descargar Archivo</h3>
                    <p className="text-xs text-slate-500">Guardar manualmente en tu PC</p>
                  </div>
                  <Download className="absolute right-4 text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Compatible con todos los servicios de almacenamiento
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CloudExportModal;
