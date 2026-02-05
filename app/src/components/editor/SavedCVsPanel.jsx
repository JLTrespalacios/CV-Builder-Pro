import React, { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Save, FolderOpen, Trash2, Edit3, Plus, FileText, Clock, FileCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SavedCVsPanel = () => {
  const { savedCVs, saveCV, deleteSavedCV, loadSavedCV, cvData, updateSavedCV, resetCVData, language } = useCVStore();
  const { addToast } = useUIStore();
  const t = TRANSLATIONS[language];
  
  const [newCVName, setNewCVName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveCurrent = () => {
    if (!newCVName.trim()) {
      addToast('Por favor ingresa un nombre para el CV', 'error');
      return;
    }
    saveCV(newCVName);
    setNewCVName('');
    setIsSaving(false);
    addToast('CV guardado exitosamente', 'success');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de eliminar este CV?')) {
      deleteSavedCV(id);
      addToast('CV eliminado', 'info');
    }
  };

  const handleLoad = (id) => {
    loadSavedCV(id);
    addToast('CV cargado', 'success');
  };

  const handleUpdate = (id, e) => {
    e.stopPropagation();
    if (window.confirm('¿Sobrescribir este CV con los datos actuales?')) {
      updateSavedCV(id);
      addToast('CV actualizado', 'success');
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 lg:p-8 min-w-[350px] max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
          <FolderOpen size={24} />
        </div>
        <div>
           <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Mis CVs</h2>
           <p className="text-sm text-slate-500">Gestiona tus diferentes versiones</p>
        </div>
      </div>

      {/* Save Current Section */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-8 relative z-20">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Save size={14} className="text-blue-500" />
          Acciones
        </h3>
        
        {isSaving ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              value={newCVName}
              onChange={(e) => setNewCVName(e.target.value)}
              placeholder="Nombre del CV (ej. Full Stack Dev)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white/50 backdrop-blur-sm transition-all"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveCurrent}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsSaving(false)}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
             <button
              onClick={() => setIsSaving(true)}
              className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all hover:scale-[1.02] border border-blue-100"
            >
              <Plus size={20} />
              Guardar Nuevo
            </button>
             <button
              onClick={() => {
                if (window.confirm('¿Crear un nuevo CV en blanco?')) {
                    resetCVData();
                    addToast('Nuevo CV iniciado', 'info');
                }
              }}
              className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all hover:scale-[1.02] border border-slate-200"
            >
              <FileText size={20} />
              Nuevo en Blanco
            </button>
          </div>
        )}
      </div>

      {/* List Saved CVs */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
          Guardados ({savedCVs.length})
        </h3>
        <AnimatePresence>
          {savedCVs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
            >
              <FolderOpen size={48} className="mx-auto mb-4 opacity-20" />
              <p>No tienes CVs guardados aún.</p>
            </motion.div>
          ) : (
            savedCVs.map((cv) => (
              <motion.div 
                key={cv.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => handleLoad(cv.id)}
                className="group relative bg-white/80 backdrop-blur-md border border-white/40 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer ring-1 ring-slate-900/5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                      <FileCheck size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                      {cv.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-medium">
                      <Clock size={12} />
                      {formatDate(cv.lastModified)}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200 font-semibold tracking-wide uppercase">
                          {cv.template || 'ModernDark'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={(e) => handleUpdate(cv.id, e)}
                      className="p-2 text-blue-600 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-100 hover:scale-110"
                      title="Actualizar con datos actuales"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(cv.id, e)}
                      className="p-2 text-red-500 bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100 hover:scale-110"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedCVsPanel;
