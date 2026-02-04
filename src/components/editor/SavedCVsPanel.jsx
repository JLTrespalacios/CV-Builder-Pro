import React, { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Save, FolderOpen, Trash2, Edit3, Plus, FileText, Clock } from 'lucide-react';

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
    <div className="p-8 pb-20 min-w-[350px]">
      <div className="flex items-center gap-3 mb-8">
         <h2 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Mis CVs Guardados</h2>
      </div>

      {/* Save Current Section */}
      <div className="bg-[var(--bg-app)] p-6 rounded-xl border border-[var(--border-subtle)] mb-8 shadow-sm">
        <h3 className="font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
          <Save size={18} className="text-blue-600" />
          Guardar CV Actual
        </h3>
        
        {isSaving ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newCVName}
              onChange={(e) => setNewCVName(e.target.value)}
              placeholder="Nombre del CV (ej. Full Stack Dev)"
              className="flex-1 px-4 py-2 rounded-lg border border-[var(--border-subtle)] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
              autoFocus
            />
            <button
              onClick={handleSaveCurrent}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsSaving(false)}
              className="px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] rounded-lg text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
             <button
              onClick={() => setIsSaving(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <Plus size={16} />
              Guardar como nuevo
            </button>
             <button
              onClick={() => {
                if (window.confirm('¿Crear un nuevo CV en blanco?')) {
                    resetCVData();
                    addToast('Nuevo CV iniciado', 'info');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              <FileText size={16} />
              Nuevo en blanco
            </button>
          </div>
        )}
      </div>

      {/* List Saved CVs */}
      <div className="space-y-4">
        {savedCVs.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-secondary)]">
            <FolderOpen size={48} className="mx-auto mb-4 opacity-20" />
            <p>No tienes CVs guardados aún.</p>
          </div>
        ) : (
          savedCVs.map((cv) => (
            <div 
              key={cv.id}
              onClick={() => handleLoad(cv.id)}
              className="group relative bg-white border border-[var(--border-subtle)] rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[var(--text-main)] group-hover:text-blue-700 transition-colors">
                    {cv.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-1">
                    <Clock size={12} />
                    {formatDate(cv.lastModified)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                        {cv.template || 'ModernDark'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleUpdate(cv.id, e)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Actualizar con datos actuales"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(cv.id, e)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCVsPanel;
