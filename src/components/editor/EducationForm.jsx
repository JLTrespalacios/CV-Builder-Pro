import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, Pencil } from 'lucide-react';
import DateSelector from '../ui/DateSelector';

const EducationForm = () => {
  const { cvData, addEducation, removeEducation, updateEducation, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset, control } = useForm();

  const handleEdit = (index) => {
    const education = cvData.education[index];
    setEditingIndex(index);
    setIsAdding(true);
    reset(education);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    reset({
      degree: '',
      school: '',
      year: '',
      description: ''
    });
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateEducation(editingIndex, data);
    } else {
      addEducation(data);
    }
    handleCancel();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.education}</h3>
        <button 
          onClick={() => {
            if (isAdding) {
              handleCancel();
            } else {
              setIsAdding(true);
              setEditingIndex(null);
              reset({
                degree: '',
                school: '',
                year: '',
                description: ''
              });
            }
          }}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium hover-btn"
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {t.add}</>}
        </button>
      </div>

      {!isAdding && (
        <div className="space-y-4 mb-4">
          {cvData.education?.map((edu, index) => (
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
                  onClick={() => removeEducation(index)}
                  className="text-red-400 hover:text-red-600 hover-btn"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h4 className="font-bold text-slate-800">{edu.degree}</h4>
              <p className="text-sm text-slate-600">
                {edu.school} | {
                  typeof edu.year === 'object' 
                    ? `${edu.year.start} - ${edu.year.isPresent ? 'Presente' : edu.year.end}`
                    : edu.year
                }
              </p>
            </div>
          ))}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-4 rounded border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.degree}</label>
            <input
              {...register("degree", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.degreePlaceholder}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.school}</label>
              <input
                {...register("school", { required: true })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.schoolPlaceholder}
              />
            </div>
            <div>
              <Controller
                name="year"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateSelector
                    label={t.year}
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
                    presentLabel="Estudio aquí actualmente"
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

export default EducationForm;
