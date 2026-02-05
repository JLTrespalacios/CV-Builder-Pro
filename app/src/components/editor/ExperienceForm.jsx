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
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
          {t.experience}
        </h3>
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
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-xl transition-all ${
            cvData.experience.length >= 5 && !isAdding
              ? 'bg-[var(--bg-muted)] text-[var(--text-secondary)] cursor-not-allowed' 
              : 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:shadow-md active:scale-95'
          }`}
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {cvData.experience.length >= 5 ? 'Máx. 5' : t.add}</>}
        </button>
      </div>

      {!isAdding && (
        <div className="space-y-3 mb-4">
          {cvData.experience?.map((exp, index) => (
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
                  onClick={() => removeExperience(index)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-main)] text-base mb-1">{exp.role}</h4>
              <p className="text-sm text-[var(--text-secondary)] font-medium flex items-center gap-2">
                <span className="text-[var(--text-main)]">{exp.company}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]"></span>
                <span className="opacity-80">
                  {typeof exp.duration === 'object' 
                    ? `${exp.duration.start} - ${exp.duration.isPresent ? 'Presente' : exp.duration.end}`
                    : exp.duration
                  }
                </span>
              </p>
            </div>
          ))}
          {cvData.experience.length === 0 && (
             <div className="text-center py-8 text-[var(--text-secondary)] border border-dashed border-[var(--border-subtle)] rounded-xl bg-[var(--bg-muted)]/30">
               <p className="text-sm">No has añadido experiencia laboral</p>
             </div>
          )}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-[var(--bg-muted)]/30 p-5 rounded-xl border border-[var(--border-subtle)] animate-fade">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.role}</label>
            <input
              {...register("role", { required: true })}
              className="modern-input"
              placeholder={t.rolePlaceholder}
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.company}</label>
              <input
                {...register("company", { required: true })}
                className="modern-input"
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
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.description}</label>
            <textarea
              {...register("description")}
              rows={4}
              className="modern-input min-h-[100px]"
              placeholder={t.descriptionPlaceholder}
            />
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

export default ExperienceForm;
