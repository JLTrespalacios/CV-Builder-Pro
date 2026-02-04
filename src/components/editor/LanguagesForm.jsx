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
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.languages}</h3>
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
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium hover-btn"
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {t.add}</>}
        </button>
      </div>

      {!isAdding && (
      <div className="space-y-4 mb-4">
        {cvData.languages.map((lang, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded border border-slate-200 relative group flex justify-between items-center hover-list-item">
            <div>
              <h4 className="font-bold text-slate-800">{lang.language}</h4>
              <p className="text-sm text-slate-600">{lang.level}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                  onClick={() => handleEdit(index)}
                  className="text-blue-400 hover:text-blue-600 hover-btn"
                  title="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => removeLanguage(index)}
                  className="text-red-400 hover:text-red-600 hover-btn"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-4 rounded border border-blue-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.langName}</label>
              <input
                {...register("language", { required: true })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.langNamePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.langLevel}</label>
              <div className="relative">
                <select
                  {...register("level", { required: true })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none hover-input"
                >
                  <option value="">Seleccionar nivel</option>
                  <optgroup label="Marco Común Europeo (MCER)">
                    <option value="A1 - Principiante">A1 - Principiante</option>
                    <option value="A2 - Básico">A2 - Básico</option>
                    <option value="B1 - Intermedio">B1 - Intermedio</option>
                    <option value="B2 - Intermedio Alto">B2 - Intermedio Alto</option>
                    <option value="C1 - Avanzado">C1 - Avanzado</option>
                    <option value="C2 - Maestría">C2 - Maestría</option>
                  </optgroup>
                  <optgroup label="Otros">
                    <option value="Nativo">Nativo</option>
                    <option value="Bilingüe">Bilingüe</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </optgroup>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-3 py-1 text-slate-600 hover:bg-slate-200 rounded text-sm hover-btn"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 hover-btn"
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
