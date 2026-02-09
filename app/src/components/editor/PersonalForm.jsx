import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { TEMPLATE_CONFIG } from '../../constants/templatesConfig';
import { Upload, CreditCard, MapPin, Fingerprint, Eye, EyeOff, Info, CheckCircle, XCircle, Camera, Trash2 } from 'lucide-react';

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
    // eslint-disable-next-line react-hooks/incompatible-library
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

  const handleRemovePhoto = () => {
    updatePersonal({ photo: null });
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
            className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
            placeholder={t.yourName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.professionalTitle}</label>
          <input
            {...register("role")}
            className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
            placeholder={t.titlePlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.professionalLevel}</label>
          <div className="relative">
            <select
              {...register("professionalLevel")}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all appearance-none"
            >
              <option value="" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.selectLevel}</option>
              <option value="Junior" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.levelJunior}</option>
              <option value="Semi-Senior" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.levelSemiSenior}</option>
              <option value="Senior" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.levelSenior}</option>
              <option value="Tech Lead" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.levelTechLead}</option>
              <option value="Architect" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.levelArchitect}</option>
              <option value="Manager" className="bg-[var(--bg-input)] text-[var(--text-main)]">{t.levelManager}</option>
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
                cvData.personal.showPhoto ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`${
                  cvData.personal.showPhoto ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
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
                    <label className="cursor-pointer bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 text-xs font-bold transition-all shadow-sm active:scale-95">
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
                        onClick={handleRemovePhoto}
                        className="text-xs text-red-500 hover:text-red-600 font-medium px-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} />
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
                <p className="text-sm font-medium text-[var(--text-main)]">{t.hidden || "Oculta"}</p>
                <p className="text-xs text-[var(--text-secondary)]">{t.photoHiddenNote}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.email}</label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.emailPlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.phone}</label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.phonePlaceholder}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.location}</label>
          <input
            {...register("location")}
            className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
            placeholder={t.locationPlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.summary}</label>
          <textarea
            {...register("summary")}
            rows={4}
            className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all resize-none"
            placeholder={t.summaryPlaceholder}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.linkedin || "LinkedIn"}</label>
            <input
              {...register("linkedin")}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.linkedinPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.website || "Sitio Web"}</label>
            <input
              {...register("website")}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder={t.websitePlaceholder}
            />
          </div>
        </div>
        
        <div>
           <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{t.github || "GitHub"}</label>
            <input
              {...register("github")}
              className="w-full px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
              placeholder="github.com/usuario"
            />
        </div>

        {/* Document ID Section */}
        <div className="pt-4 border-t border-[var(--border-subtle)]">
            <h4 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                <CreditCard size={14} className="text-[var(--primary)]" />
                {t.idDocument}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">{t.idType}</label>
                    <select
                        {...register("documentType")}
                        className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                    >
                        <option value="DNI">DNI / NIF</option>
                        <option value="NIE">NIE</option>
                        <option value="PASSPORT">{t.passport}</option>
                        <option value="CC">{t.idCard}</option>
                        <option value="CE">{t.foreignId}</option>
                        <option value="NIT">{t.nit}</option>
                        <option value="RUT">RUT</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">{t.idNumber}</label>
                    <input
                        {...register("documentNumber")}
                        className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                        placeholder={t.idNumberPlaceholder}
                    />
                </div>
                 <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">{t.expeditionPlace}</label>
                    <input
                        {...register("expeditionPlace")}
                        className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all"
                        placeholder={t.expeditionPlaceholder}
                    />
                </div>
            </div>
        </div>

      </form>
    </div>
  );
};

export default PersonalForm;
