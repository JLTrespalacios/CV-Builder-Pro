import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, Pencil } from 'lucide-react';
import DateSelector from '../ui/DateSelector';

const ExperienceForm = () => {
  const { cvData, addExperience, removeExperience, updateExperience, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset, control } = useForm();

  const handleEdit = (index) => {
    const experience = cvData.experience[index];
    setEditingIndex(index);
    setIsAdding(true);
    reset(experience);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    reset({
      role: '',
      company: '',
      duration: '',
      description: ''
    });
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateExperience(editingIndex, data);
    } else {
      addExperience(data);
    }
    handleCancel();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.experience}</h3>
        <button 
          onClick={() => {
            if (isAdding) {
              handleCancel();
            } else {
              setIsAdding(true);
              setEditingIndex(null);
              reset({
                role: '',
                company: '',
                duration: '',
                description: ''
              });
            }
          }}
          disabled={cvData.experience.length >= 5 && !isAdding}
          className={`flex items-center gap-1 text-sm font-medium hover-btn ${
            cvData.experience.length >= 5 && !isAdding
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {cvData.experience.length >= 5 ? 'Máx. 5' : t.add}</>}
        </button>
      </div>

      {!isAdding && (
        <div className="space-y-4 mb-4">
          {cvData.experience?.map((exp, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded border border-slate-200 relative group hover-list-item">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(index)}
                  className="text-blue-400 hover:text-blue-600 hover-btn"
                  title="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => removeExperience(index)}
                  className="text-red-400 hover:text-red-600 hover-btn"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h4 className="font-bold text-slate-800">{exp.role}</h4>
              <p className="text-sm text-slate-600">
                {exp.company} | {
                  typeof exp.duration === 'object' 
                    ? `${exp.duration.start} - ${exp.duration.isPresent ? 'Presente' : exp.duration.end}`
                    : exp.duration
                }
              </p>
            </div>
          ))}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-4 rounded border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.role}</label>
            <input
              {...register("role", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.rolePlaceholder}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.company}</label>
              <input
                {...register("company", { required: true })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.companyPlaceholder}
              />
            </div>
            <div>
              <Controller
                name="duration"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateSelector
                    label={t.duration}
                    value={field.value}
                    onChange={(val) => {
                      let str = '';
                      if (val.mode === 'single') {
                        str = val.start;
                      } else if (val.mode === 'present') {
                        str = `${val.start} - Presente`;
                      } else {
                        str = `${val.start} - ${val.end}`;
                      }
                      field.onChange(str);
                    }}
                    isRange={true}
                    allowPresent={true}
                    placeholder="YYYY"
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.description}</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.descriptionPlaceholder}
            />
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

export default ExperienceForm;
