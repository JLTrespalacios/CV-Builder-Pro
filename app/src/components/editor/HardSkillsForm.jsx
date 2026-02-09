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
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
           <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
           {t.hardSkills}
        </h3>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingIndex(null);
            reset();
          }}
          className="text-[var(--primary)] hover:text-[var(--primary)]/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <Plus size={16} /> {t.add}
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {cvData.hardSkills.map((skill, index) => (
          <div key={index} className="bg-[var(--bg-muted)] p-4 rounded-xl border border-[var(--border-subtle)] relative group hover:border-[var(--primary)]/30 transition-all">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-muted)] pl-2">
              <button 
                onClick={() => handleEdit(index)}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors p-1"
              >
                <Pencil size={15} />
              </button>
              <button 
                onClick={() => removeHardSkill(index)}
                className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <h4 className="font-bold text-[var(--text-main)] mb-1">{skill.category}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{skill.items}</p>
          </div>
        ))}
        {cvData.hardSkills.length === 0 && !isAdding && (
          <p className="text-sm text-[var(--text-secondary)] italic opacity-60 w-full text-center py-4">
            No hay habilidades técnicas añadidas
          </p>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[var(--bg-muted)]/50 p-4 rounded-xl border border-[var(--primary)]/20">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">{t.category}</label>
            <input
              {...register("category", { required: true })}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.categoryPlaceholder}
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">{t.items}</label>
            <input
              {...register("items", { required: true })}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.itemsPlaceholder}
            />
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
              {editingIndex !== null ? t.update || 'Actualizar' : t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HardSkillsForm;
