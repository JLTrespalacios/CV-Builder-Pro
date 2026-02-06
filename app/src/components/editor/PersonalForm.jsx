import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { TEMPLATE_CONFIG } from '../../constants/templatesConfig';
import { Upload, CreditCard, MapPin, Fingerprint, Eye, EyeOff, Info, CheckCircle, XCircle, Camera } from 'lucide-react';

const PersonalForm = () => {
  const { cvData, updatePersonal, language, template: templateId } = useCVStore();
  const t = TRANSLATIONS[language];
  const { register, watch } = useForm({
    defaultValues: cvData.personal
  });

  // Get current template info for smart recommendations
  const currentTemplate = useMemo(() => 
    TEMPLATE_CONFIG.find(t => t.id === templateId) || TEMPLATE_CONFIG[0], 
    [templateId]
  );

  const isCreative = currentTemplate?.category === 'Creative' || currentTemplate?.role?.includes('Creative');
  const isTechOrATS = currentTemplate?.category === 'Tech' || currentTemplate?.keywords?.includes('ATS');

  // Watch for changes and update store immediately
  useEffect(() => {
    const subscription = watch((value) => {
      updatePersonal(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonal]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[var(--bg-panel)] p-6 rounded-2xl shadow-sm border border-[var(--border-subtle)] transition-all hover:shadow-md">
      <h3 className="text-lg font-bold mb-6 text-[var(--text-main)] flex items-center gap-2">
        <div className="w-1 h-6 bg-[var(--primary)] rounded-full"></div>
        {t.personalInfo}
      </h3>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.fullName}</label>
          <input
            {...register("name")}
            className="modern-input"
            placeholder={t.yourName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.professionalTitle}</label>
          <input
            {...register("role")}
            className="modern-input"
            placeholder={t.titlePlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.professionalLevel}</label>
          <div className="relative">
            <select
              {...register("professionalLevel")}
              className="modern-input appearance-none"
            >
              <option value="">{t.selectLevel}</option>
              <option value="Junior">{t.levelJunior}</option>
              <option value="Semi-Senior">{t.levelSemiSenior}</option>
              <option value="Senior">{t.levelSenior}</option>
              <option value="Tech Lead">{t.levelTechLead}</option>
              <option value="Architect">{t.levelArchitect}</option>
              <option value="Manager">{t.levelManager}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[var(--text-secondary)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Photo Section with Smart Logic */}
        <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-subtle)]/30">
          <div className="flex justify-between items-center mb-3">
            <div>
              <label className="block text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                <Camera size={16} className="text-[var(--primary)]" />
                {t.photo || "Foto profesional"} 
                <span className="text-xs font-normal text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                  {t.optional || "Opcional"}
                </span>
              </label>
              
              {/* Smart Recommendation Microcopy */}
              <div className="mt-1 flex items-center gap-1.5">
                {isCreative ? (
                   <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                     <Info size={12} />
                     Recomendado para tu perfil {currentTemplate.category || "Creativo"}
                   </span>
                ) : isTechOrATS ? (
                   <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                     <Info size={12} />
                     Mejor sin foto para roles ATS/Tech
                   </span>
                ) : (
                   <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                     <Info size={12} />
                     El diseño se adapta automáticamente
                   </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => updatePersonal({ showPhoto: !cvData.personal.showPhoto })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
                cvData.personal.showPhoto ? 'bg-[var(--primary)]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`${
                  cvData.personal.showPhoto ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
          
          {cvData.personal.showPhoto ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-5 p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] shadow-sm">
                {cvData.personal.photo ? (
                  <img 
                    src={cvData.personal.photo} 
                    alt="Preview" 
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[var(--border-subtle)]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    <Upload size={20} />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex gap-3">
                    <label className="cursor-pointer bg-[var(--text-main)] text-[var(--bg-panel)] px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 text-xs font-bold transition-all shadow-sm active:scale-95">
                      <Upload size={14} />
                      {cvData.personal.photo ? t.changePhoto : t.uploadPhoto}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>
                    {cvData.personal.photo && (
                      <button
                        type="button"
                        onClick={() => updatePersonal({ photo: null })}
                        className="text-xs text-red-500 hover:text-red-600 font-medium px-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {t.deletePhoto}
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-2">Recomendado: 400x400px, JPG/PNG, Fondo neutro</p>
                </div>
              </div>

              {/* Professional Guidelines */}
              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                  <CheckCircle size={12} />
                  Guía para foto profesional
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <ul className="text-[10px] space-y-1 text-blue-800/80 dark:text-blue-200/80">
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 bg-blue-400 rounded-full"></span>Fondo neutro (blanco/gris)</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 bg-blue-400 rounded-full"></span>Buena iluminación frontal</li>
                  </ul>
                  <ul className="text-[10px] space-y-1 text-blue-800/80 dark:text-blue-200/80">
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 bg-blue-400 rounded-full"></span>Ropa formal / Business casual</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 bg-blue-400 rounded-full"></span>Expresión natural y profesional</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[var(--bg-panel)] rounded-lg border border-[var(--border-subtle)] flex items-start gap-3 opacity-80">
              <div className="p-2 bg-[var(--bg-muted)] rounded-full text-[var(--text-secondary)]">
                <EyeOff size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--text-main)] mb-0.5">Modo ATS (Sin foto)</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  Tu CV se generará sin foto, priorizando el contenido textual para máxima compatibilidad con sistemas de reclutamiento (ATS).
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.lblEmail}</label>
            <input
              {...register("email")}
              className="modern-input"
              placeholder={t.emailPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.lblPhone}</label>
            <input
              {...register("phone")}
              className="modern-input"
              placeholder={t.phonePlaceholder}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.lblLocation}</label>
          <div className="relative">
            <input
              {...register("location")}
              className="modern-input pl-10"
              placeholder={t.locationPlaceholder}
            />
            <MapPin size={16} className="absolute left-3.5 top-3.5 text-[var(--text-secondary)]" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.linkedin}</label>
          <input
            {...register("linkedin")}
            className="modern-input"
            placeholder={t.linkedinPlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.github}</label>
          <input
            {...register("github")}
            className="modern-input"
            placeholder="github.com/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.lblWebsite}</label>
          <input
            {...register("website")}
            className="modern-input"
            placeholder={t.websitePlaceholder}
          />
        </div>

        {/* Document Identification Module */}
        <div className="bg-[var(--bg-muted)]/50 p-5 rounded-xl border border-[var(--border-subtle)] mt-2 hover:border-[var(--primary)]/20 transition-colors">
          <h4 className="text-sm font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-[var(--bg-panel)] rounded-lg shadow-sm">
              <CreditCard size={14} className="text-[var(--primary)]" />
            </div>
            {t.idDocument}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">{t.idType}</label>
              <div className="relative">
                <select
                  {...register("documentType")}
                  className="w-full pl-3 pr-8 py-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-slate-700 hover-input"
                >
                  <option value="">{t.select}</option>
                  <option value="C.C.">Cédula (C.C.)</option>
                  <option value="NIT">NIT</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="C.E.">Cédula Ext.</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">{t.idNumber}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Fingerprint size={14} className="text-slate-400" />
                </div>
                <input
                  {...register("documentNumber")}
                  className="w-full pl-9 pr-3 py-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-700 hover-input"
                  placeholder={t.idNumberPlaceholder}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">{t.expeditionPlace}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={14} className="text-slate-400" />
                </div>
                <input
                  {...register("expeditionPlace")}
                  className="w-full pl-9 pr-3 py-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 hover-input"
                  placeholder={t.expeditionPlaceholder}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.summary}</label>
          <textarea
            {...register("summary")}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder={t.summaryPlaceholder}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalForm;
