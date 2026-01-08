import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2 } from 'lucide-react';
import DateSelector from '../ui/DateSelector';

const ExperienceForm = () => {
  const { cvData, addExperience, removeExperience, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset, control } = useForm();

  const onSubmit = (data) => {
    addExperience(data);
    reset();
    setIsAdding(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.experience}</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium hover-btn"
        >
          <Plus size={16} /> {t.add}
        </button>
      </div>

      <div className="space-y-4 mb-4">
        {cvData.experience.map((exp, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded border border-slate-200 relative group hover-list-item">
            <button 
              onClick={() => removeExperience(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover-btn"
            >
              <Trash2 size={16} />
            </button>
            <h4 className="font-bold text-slate-800">{exp.role}</h4>
            <p className="text-sm text-slate-600">{exp.company} | {exp.duration}</p>
          </div>
        ))}
      </div>

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
                    onChange={field.onChange}
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
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-slate-600 hover:bg-slate-200 rounded text-sm hover-btn"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 hover-btn"
            >
              {t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExperienceForm;
