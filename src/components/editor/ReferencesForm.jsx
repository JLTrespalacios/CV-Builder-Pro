import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, User, Phone, Mail, Building } from 'lucide-react';

const ReferencesForm = () => {
  const { cvData, addReference, removeReference, toggleReferencesOnRequest, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addReference(data);
    reset();
    setIsAdding(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t.references}</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium hover-btn"
        >
          <Plus size={16} /> {t.add}
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-md border border-blue-100 hover-list-item">
        <input 
          type="checkbox" 
          id="refsOnRequest"
          checked={cvData.referencesAvailableOnRequest || false}
          onChange={toggleReferencesOnRequest}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <label htmlFor="refsOnRequest" className="text-sm text-slate-700 font-medium cursor-pointer select-none">
          {t.availableOnRequest}
        </label>
      </div>

      <div className="space-y-4 mb-4">
        {cvData.references.map((ref, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded border border-slate-200 relative group hover-list-item">
            <button 
              onClick={() => removeReference(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover-btn"
            >
              <Trash2 size={16} />
            </button>
            <h4 className="font-bold text-slate-800">{ref.name}</h4>
            <p className="text-sm text-slate-600">{ref.role} {ref.company && `at ${ref.company}`}</p>
            <div className="text-xs text-slate-500 mt-1 flex gap-2">
              {ref.phone && <span className="flex items-center gap-1"><Phone size={10} /> {ref.phone}</span>}
              {ref.email && <span className="flex items-center gap-1"><Mail size={10} /> {ref.email}</span>}
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-4 rounded border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.refName}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={14} className="text-slate-400" />
              </div>
              <input
                {...register("name", { required: true })}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.refNamePlaceholder}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.refRole}</label>
              <input
                {...register("role")}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                placeholder={t.refRolePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.refCompany}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={14} className="text-slate-400" />
                </div>
                <input
                  {...register("company")}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                  placeholder={t.refCompanyPlaceholder}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.refPhone}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={14} className="text-slate-400" />
                </div>
                <input
                  {...register("phone")}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                  placeholder={t.refPhonePlaceholder}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.refEmail}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={14} className="text-slate-400" />
                </div>
                <input
                  {...register("email")}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
                  placeholder={t.refEmailPlaceholder}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-slate-600 hover:text-slate-800 text-sm"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              {t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReferencesForm;
