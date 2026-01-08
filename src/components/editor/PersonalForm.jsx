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
    <div className="bg-white p-6 rounded-lg shadow-sm hover-card">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">{t.personalInfo}</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.fullName}</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder={t.yourName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.professionalTitle}</label>
          <input
            {...register("role")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder={t.titlePlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.professionalLevel}</label>
          <div className="relative">
            <select
              {...register("professionalLevel")}
              className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-slate-700 hover-input"
            >
              <option value="">{t.selectLevel}</option>
              <option value="Junior">{t.levelJunior}</option>
              <option value="Semi-Senior">{t.levelSemiSenior}</option>
              <option value="Senior">{t.levelSenior}</option>
              <option value="Tech Lead">{t.levelTechLead}</option>
              <option value="Architect">{t.levelArchitect}</option>
              <option value="Manager">{t.levelManager}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">{t.photo}</label>
            <button
              type="button"
              onClick={() => updatePersonal({ showPhoto: !cvData.personal.showPhoto })}
              className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors hover-btn ${cvData.personal.showPhoto ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}
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
          
          <div className={`flex items-center gap-4 transition-all duration-300 ${cvData.personal.showPhoto ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            {cvData.personal.photo && (
              <img 
                src={cvData.personal.photo} 
                alt="Preview" 
                className="w-16 h-16 rounded-full object-cover border border-slate-200"
              />
            )}
            <label className="cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 flex items-center gap-2 text-sm transition-colors hover-btn">
              <Upload size={16} />
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
                className="text-sm text-red-500 hover:text-red-700"
              >
                {t.deletePhoto}
              </button>
            )}
          </div>
          {!cvData.personal.showPhoto && (
             <p className="text-xs text-slate-500 mt-2 italic">{t.photoHiddenNote}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.lblEmail}</label>
            <input
              {...register("email")}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.emailPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.lblPhone}</label>
            <input
              {...register("phone")}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
              placeholder={t.phonePlaceholder}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.lblLocation}</label>
          <input
            {...register("location")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder={t.locationPlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.linkedin}</label>
          <input
            {...register("linkedin")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder={t.linkedinPlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.github}</label>
          <input
            {...register("github")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder="github.com/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.lblWebsite}</label>
          <input
            {...register("website")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover-input"
            placeholder={t.websitePlaceholder}
          />
        </div>

        {/* Document Identification Module */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2 hover-list-item">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <CreditCard size={16} className="text-slate-500" />
            {t.idDocument}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">{t.idType}</label>
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
