import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, Pencil } from 'lucide-react';

const LanguagesForm = () => {
  const { cvData, addLanguage, removeLanguage, updateLanguage, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset } = useForm();

  const handleEdit = (index) => {
    const lang = cvData.languages[index];
    setEditingIndex(index);
    setIsAdding(true);
    reset(lang);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    reset({
        language: '',
        level: ''
    });
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateLanguage(editingIndex, data);
    } else {
      addLanguage(data);
    }
    handleCancel();
  };

  return (
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
          {t.languages}
        </h3>
        <button 
          onClick={() => {
            if (isAdding) {
                handleCancel();
            } else {
                setIsAdding(true);
                setEditingIndex(null);
                reset({ language: '', level: '' });
            }
          }}
          className="text-[var(--primary)] hover:text-[var(--primary)]/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {t.add}</>}
        </button>
      </div>

      {!isAdding && (
      <div className="space-y-3 mb-6">
        {cvData.languages.map((lang, index) => (
          <div key={index} className="bg-[var(--bg-muted)] p-4 rounded-xl border border-[var(--border-subtle)] relative group flex justify-between items-center transition-all hover:border-[var(--primary)]/30">
            <div>
              <h4 className="font-bold text-[var(--text-main)] mb-1">{lang.language}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{lang.level}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-muted)] pl-2">
                 <button 
                  onClick={() => handleEdit(index)}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors p-1"
                  title="Editar"
                >
                  <Pencil size={15} />
                </button>
                <button 
                  onClick={() => removeLanguage(index)}
                  className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1"
                  title="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
            </div>
          </div>
        ))}
        {cvData.languages.length === 0 && (
          <p className="text-sm text-[var(--text-secondary)] italic opacity-60 w-full text-center py-4">
            No hay idiomas añadidos
          </p>
        )}
      </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[var(--bg-muted)]/50 p-4 rounded-xl border border-[var(--primary)]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">{t.langName}</label>
              <input
                {...register("language", { required: true })}
                className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                placeholder={t.langNamePlaceholder}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">{t.langLevel}</label>
              <div className="relative">
                <select
                  {...register("level", { required: true })}
                  className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all appearance-none"
                >
                  <option value="" className="bg-[var(--bg-input)] text-[var(--text-main)]">Seleccionar nivel</option>
                  <optgroup label="Marco Común Europeo (MCER)" className="bg-[var(--bg-input)] text-[var(--text-main)]">
                    <option value="A1 - Principiante">A1 - Principiante</option>
                    <option value="A2 - Básico">A2 - Básico</option>
                    <option value="B1 - Intermedio">B1 - Intermedio</option>
                    <option value="B2 - Intermedio Alto">B2 - Intermedio Alto</option>
                    <option value="C1 - Avanzado">C1 - Avanzado</option>
                    <option value="C2 - Maestría">C2 - Maestría</option>
                  </optgroup>
                  <optgroup label="Otros" className="bg-[var(--bg-input)] text-[var(--text-main)]">
                    <option value="Nativo">Nativo</option>
                    <option value="Bilingüe">Bilingüe</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </optgroup>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[var(--text-secondary)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-canvas)] rounded-lg text-sm font-medium transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 shadow-sm hover:shadow-md active:scale-95 text-sm font-medium transition-all"
            >
              {editingIndex !== null ? 'Actualizar' : t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LanguagesForm;
