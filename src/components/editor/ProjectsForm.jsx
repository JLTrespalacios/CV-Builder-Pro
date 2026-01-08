import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { cvData, addProject, removeProject, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addProject(data);
    reset();
    setIsAdding(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.projects}</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium hover-btn"
        >
          <Plus size={16} /> {t.add}
        </button>
      </div>

      <div className="space-y-4 mb-4">
        {cvData.projects.map((proj, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded border border-slate-200 relative group hover-list-item">
            <button 
              onClick={() => removeProject(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover-btn"
            >
              <Trash2 size={16} />
            </button>
            <h4 className="font-bold text-slate-800">{proj.name}</h4>
            <p className="text-sm text-slate-600">{proj.technologies}</p>
          </div>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-4 rounded border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.projectName}</label>
            <input
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.projectNamePlaceholder}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.projectDescription}</label>
            <textarea
              {...register("description")}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.descriptionPlaceholder}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.projectTech}</label>
              <input
                {...register("technologies")}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.projectTechPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.projectLink}</label>
              <input
                {...register("link")}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.projectLinkPlaceholder}
              />
            </div>
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

export default ProjectsForm;
