import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Plus, Trash2, Pencil } from 'lucide-react';
import DateSelector from '../ui/DateSelector';

const CertificationsForm = () => {
  const { cvData, addCertification, removeCertification, updateCertification, language } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const t = TRANSLATIONS[language];
  
  const { register, handleSubmit, reset, control } = useForm();

  const handleEdit = (index) => {
    const cert = cvData.certifications[index];
    setEditingIndex(index);
    setIsAdding(true);
    reset(cert);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    reset({
      name: '',
      issuer: '',
      date: ''
    });
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateCertification(editingIndex, data);
    } else {
      addCertification(data);
    }
    handleCancel();
  };

  return (
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
          {t.certifications}
        </h3>
        <button 
          onClick={() => {
            if (isAdding) {
              handleCancel();
            } else {
              setIsAdding(true);
              setEditingIndex(null);
              reset({
                name: '',
                issuer: '',
                date: ''
              });
            }
          }}
          className="text-[var(--primary)] hover:text-[var(--primary)]/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          {isAdding ? 'Cancelar' : <><Plus size={16} /> {t.add}</>}
        </button>
      </div>

      {!isAdding && (
        <div className="space-y-3 mb-6">
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="bg-[var(--bg-muted)] p-4 rounded-xl border border-[var(--border-subtle)] relative group hover:border-[var(--primary)]/30 transition-all">
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-muted)] pl-2">
                <button 
                  onClick={() => handleEdit(index)}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors p-1"
                  title="Editar"
                >
                  <Pencil size={15} />
                </button>
                <button 
                  onClick={() => removeCertification(index)}
                  className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1"
                  title="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-1">{cert.name}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{cert.issuer} | {cert.date}</p>
            </div>
          ))}
          {cvData.certifications.length === 0 && (
            <p className="text-sm text-[var(--text-secondary)] italic opacity-60 w-full text-center py-4">
              No hay certificaciones añadidas
            </p>
          )}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[var(--bg-muted)]/50 p-4 rounded-xl border border-[var(--primary)]/20">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">{t.certName}</label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.certNamePlaceholder}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">{t.certIssuer}</label>
              <input
                {...register("issuer")}
                className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                placeholder={t.certIssuerPlaceholder}
              />
            </div>
            <div>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateSelector
                    label={t.certDate}
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
                    presentLabel="En curso / Actualmente"
                    placeholder="YYYY"
                  />
                )}
              />
            </div>
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
              {editingIndex !== null ? 'Actualizar' : t.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CertificationsForm;
