import React, { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { X, Plus } from 'lucide-react';

const SkillsForm = () => {
  const { cvData, addSkill, removeSkill, language } = useCVStore();
  const [newSkill, setNewSkill] = useState("");
  const t = TRANSLATIONS[language];

  const handleAdd = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{t.skills}</h3>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
          placeholder={t.skillPlaceholder}
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 flex items-center hover-btn"
        >
          <Plus size={18} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {cvData.skills.map((skill, index) => (
          <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-100 hover:shadow-sm hover:scale-105 transition-all duration-200">
            {skill}
            <button 
              onClick={() => removeSkill(skill)}
              className="text-blue-400 hover:text-blue-600 hover-btn"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
