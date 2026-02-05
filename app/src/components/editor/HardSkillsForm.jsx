import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, Pencil } from 'lucide-react';

const HardSkillsForm = () => {
  const { cvData, addHardSkill, removeHardSkill, updateHardSkill, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateHardSkill(editingIndex, data);
      setEditingIndex(null);
    } else {
      addHardSkill(data);
    }
    reset();
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    const skill = cvData.hardSkills[index];
    setValue('category', skill.category);
    setValue('items', skill.items);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.hardSkills}</h3>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingIndex(null);
            reset();
          }}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium hover-btn"
        >
          <Plus size={16} /> {t.add}
        </button>
      </div>

      <div className="space-y-4 mb-4">
        {cvData.hardSkills.map((skill, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded border border-slate-200 relative group hover-list-item">
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleEdit(index)}
                className="text-blue-400 hover:text-blue-600 hover-btn"
              >
                <Pencil size={16} />
              </button>
              <button 
                onClick={() => removeHardSkill(index)}
                className="text-red-400 hover:text-red-600 hover-btn"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <h4 className="font-bold text-slate-800">{skill.category}</h4>
            <p className="text-sm text-slate-600">{skill.items}</p>
          </div>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-4 rounded border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.category}</label>
            <input
              {...register("category", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.categoryPlaceholder}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.items}</label>
            <input
              {...register("items", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.itemsPlaceholder}
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
              {editingIndex !== null ? t.update || 'Actualizar' : t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HardSkillsForm;
