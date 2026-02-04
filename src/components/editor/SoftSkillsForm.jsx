import React, { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { X, Plus, Pencil } from 'lucide-react';

const SoftSkillsForm = () => {
  const { cvData, addSoftSkill, removeSoftSkill, updateSoftSkill, language } = useCVStore();
  const [newSkill, setNewSkill] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      if (editingIndex !== null) {
        updateSoftSkill(editingIndex, newSkill.trim());
        setEditingIndex(null);
      } else {
        addSoftSkill(newSkill.trim());
      }
      setNewSkill("");
    }
  };

  const handleEdit = (index) => {
    setNewSkill(cvData.softSkills[index]);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setNewSkill("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{t.softSkills}</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
          placeholder={t.softSkillPlaceholder}
        />
        {editingIndex !== null && (
            <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-2 text-slate-600 hover:bg-slate-200 rounded-md hover-btn text-sm"
            >
                {t.cancel}
            </button>
        )}
        <button 
          type="submit"
          className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 flex items-center hover-btn text-sm font-medium"
        >
          {editingIndex !== null ? 'Actualizar' : <Plus size={18} />}
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {cvData.softSkills.map((skill, index) => (
          <span key={index} className={`bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-100 hover:shadow-sm transition-all duration-200 ${editingIndex === index ? 'ring-2 ring-blue-500' : ''}`}>
            {skill}
             <button 
              onClick={() => handleEdit(index)}
              className="text-blue-400 hover:text-blue-600 hover-btn"
              title="Editar"
            >
              <Pencil size={12} />
            </button>
            <button 
              onClick={() => removeSoftSkill(index)}
              className="text-red-400 hover:text-red-600 hover-btn"
              title="Eliminar"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SoftSkillsForm;
