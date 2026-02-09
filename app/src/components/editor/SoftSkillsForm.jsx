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
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <h3 className="text-lg font-bold mb-6 text-[var(--text-main)] flex items-center gap-2">
        <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
        {t.softSkills}
      </h3>
      
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 relative">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all pr-24"
          placeholder={t.softSkillPlaceholder || "Ej: Liderazgo, Comunicación..."}
          autoFocus={editingIndex !== null}
        />
        
        <div className="absolute right-1.5 top-1.5 flex gap-1">
          {editingIndex !== null && (
              <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] rounded-lg text-xs font-medium transition-colors"
              >
                  {t.cancel}
              </button>
          )}
          <button 
            type="submit"
            disabled={!newSkill.trim()}
            className="px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 shadow-sm transition-all hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
          >
            {editingIndex !== null ? 'OK' : <Plus size={18} />}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2.5">
        {cvData.softSkills.map((skill, index) => (
          <span key={index} className={`group bg-[var(--bg-muted)] text-[var(--text-main)] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2.5 border border-[var(--border-subtle)] transition-all duration-200 hover:border-[var(--primary)]/30 hover:shadow-sm ${editingIndex === index ? 'ring-2 ring-[var(--primary)] bg-[var(--primary)]/5 border-[var(--primary)]' : ''}`}>
            {skill}
            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity border-l border-[var(--border-subtle)] pl-2 ml-1">
               <button 
                onClick={() => handleEdit(index)}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors p-0.5"
                title="Editar"
              >
                <Pencil size={12} />
              </button>
              <button 
                onClick={() => removeSoftSkill(index)}
                className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-0.5"
                title="Eliminar"
              >
                <X size={14} />
              </button>
            </div>
          </span>
        ))}
        {cvData.softSkills.length === 0 && (
          <p className="text-sm text-[var(--text-secondary)] italic opacity-60 w-full text-center py-4">
            Añade tus habilidades blandas
          </p>
        )}
      </div>
    </div>
  );
};

export default SoftSkillsForm;
