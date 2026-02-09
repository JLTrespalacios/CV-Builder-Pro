import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, Pencil } from 'lucide-react';

const ProjectsForm = () => {
  const { cvData, addProject, removeProject, updateProject, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset } = useForm();

  const handleEdit = (index) => {
    const project = cvData.projects[index];
    setEditingIndex(index);
    setIsAdding(true);
    reset(project);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    reset({
      name: '',
      description: '',
      technologies: '',
      link: ''
    });
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateProject(editingIndex, data);
    } else {
      addProject(data);
    }
    handleCancel();
  };

  return (
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
          {t.projects}
        </h3>
        <button 
          onClick={() => {
            if (isAdding) {
              handleCancel();
            } else {
              setIsAdding(true);
              setEditingIndex(null);
              reset({
                name: '',
                description: '',
                technologies: '',
                link: ''
              });
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all hover:shadow-md active:scale-95"
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {t.add}</>}
        </button>
      </div>

      {!isAdding && (
        <div className="space-y-3 mb-4">
          {cvData.projects.map((proj, index) => (
            <div key={index} className="bg-[var(--bg-muted)]/50 p-4 rounded-xl border border-[var(--border-subtle)] relative group hover:border-[var(--primary)]/30 transition-all hover:shadow-sm hover:-translate-y-0.5">
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(index)}
                  className="p-1.5 text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => removeProject(index)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-main)] text-base mb-1">{proj.name}</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-1">{proj.technologies}</p>
              {proj.link && <p className="text-xs text-[var(--primary)] truncate">{proj.link}</p>}
            </div>
          ))}
          {cvData.projects.length === 0 && (
             <div className="text-center py-8 text-[var(--text-secondary)] border border-dashed border-[var(--border-subtle)] rounded-xl bg-[var(--bg-muted)]/30">
               <p className="text-sm">No has añadido proyectos destacados</p>
             </div>
          )}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-[var(--bg-muted)]/30 p-5 rounded-xl border border-[var(--border-subtle)] animate-fade">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.projectName}</label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.projectNamePlaceholder}
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.projectDescription}</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all min-h-[80px]"
              placeholder={t.descriptionPlaceholder}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.projectTech}</label>
              <input
                {...register("technologies")}
                className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                placeholder={t.projectTechPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.projectLink}</label>
              <input
                {...register("link")}
                className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                placeholder={t.projectLinkPlaceholder}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] rounded-xl text-sm font-medium transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl text-sm font-bold hover:bg-[var(--primary)]/90 shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {editingIndex !== null ? 'Actualizar' : t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectsForm;
