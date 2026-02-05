import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { Upload, CreditCard, MapPin, Fingerprint, Eye, EyeOff } from 'lucide-react';

const PersonalForm = () => {
  const { cvData, updatePersonal, language } = useCVStore();
  const t = TRANSLATIONS[language];
  const { register, watch } = useForm({
    defaultValues: cvData.personal
  });

  // Watch for changes and update store immediately
  // We remove the useEffect that resets on every store change to avoid input cursor jumping
  // and infinite loops.
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

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">{t.photo}</label>
            <button
              type="button"
              onClick={() => updatePersonal({ showPhoto: !cvData.personal.showPhoto })}
              className={`text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors font-medium ${cvData.personal.showPhoto ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'bg-[var(--bg-muted)] text-[var(--text-secondary)]'}`}
              title={cvData.personal.showPhoto ? t.hidePhotoTitle : t.showPhotoTitle}
            >
              {cvData.personal.showPhoto ? (
                <>
                  <Eye size={14} />
                  {t.visible}
                </>
              ) : (
                <>
                  <EyeOff size={14} />
                  {t.hidden}
                </>
              )}
            </button>
          </div>
          
          <div className={`flex items-center gap-5 transition-all duration-300 p-4 rounded-xl border border-[var(--border-subtle)] border-dashed ${cvData.personal.showPhoto ? 'bg-[var(--bg-muted)]/30' : 'opacity-60 grayscale bg-[var(--bg-muted)]'}`}>
            {cvData.personal.photo ? (
              <img 
                src={cvData.personal.photo} 
                alt="Preview" 
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[var(--bg-panel)] shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                <Upload size={20} />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex gap-3">
                <label className="cursor-pointer bg-[var(--text-main)] text-[var(--bg-panel)] px-4 py-2 rounded-xl hover:opacity-90 flex items-center gap-2 text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95">
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
                    className="text-xs text-red-500 hover:text-red-600 font-medium px-2"
                  >
                    {t.deletePhoto}
                  </button>
                )}
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] mt-2">Recomendado: 400x400px, JPG o PNG</p>
            </div>
          </div>
          {!cvData.personal.showPhoto && (
             <p className="text-xs text-[var(--text-secondary)] mt-2 italic flex items-center gap-1">
               <EyeOff size={12} />
               {t.photoHiddenNote}
             </p>
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
