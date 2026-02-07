import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';
import { EditableText } from '../components/ui/EditableText';

const ModernDark = ({ data, color }) => {
  const { language, updatePersonal, cvData, design, themeColor } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
  const accentColor = themeColor || color || '#2563eb';

  // Helper to update specific fields
  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const containerStyle = {
    background: 'linear-gradient(to right, #0f172a 33.333%, #ffffff 33.333%)',
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
    paddingTop: `${design?.marginTop || 0}px`,
    fontSize: `${design?.fontSize || 16}px`,
    fontFamily: design?.fontFamily || 'Inter',
    color: design?.fontColor || '#334155'
  };

  const gapStyle = {
      gap: `${design?.sectionGap || 24}px`
  };

  const titleStyle = {
    fontFamily: design?.titleFont || design?.fontFamily || 'Inter'
  };

  return (
    <div 
      className="w-full min-h-full text-gray-800 font-sans grid grid-cols-[1fr_2fr]"
      style={containerStyle}
    >
      {/* Sidebar / Left Column */}
      <div className="text-white p-6 print:p-0 flex flex-col" style={gapStyle}>
        <div className="text-center break-inside-avoid">
          {/* Photo */}
          {personal.showPhoto && (
            <div className="w-32 h-32 mx-auto mb-4 bg-slate-700 rounded-full overflow-hidden flex items-center justify-center border-4" style={{ borderColor: accentColor }}>
              {personal.photo ? (
                <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold" style={{ color: accentColor }}>{personal.name ? personal.name.charAt(0) : 'U'}</span>
              )}
            </div>
          )}
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblContact}</h2>
          <div className="text-sm space-y-2 text-slate-300">
            <EditableText 
              value={personal.email} 
              onChange={(val) => handlePersonalUpdate('email', val)}
              className="block break-all"
              placeholder="Email"
            />
            <EditableText 
              value={personal.phone} 
              onChange={(val) => handlePersonalUpdate('phone', val)}
              className="block"
              placeholder="Teléfono"
            />
            <EditableText 
              value={personal.location} 
              onChange={(val) => handlePersonalUpdate('location', val)}
              className="block"
              placeholder="Ubicación"
            />

            {personal.documentNumber && (
              <p className="text-xs">
                <span className="font-semibold text-slate-400 block">{getDocumentTypeLabel(personal.documentType, t) || 'ID'}:</span>
                {personal.documentNumber} {personal.expeditionPlace && <span className="text-slate-500 block">{personal.expeditionPlace}</span>}
              </p>
            )}
            {personal.linkedin && (
              <p className="break-all text-xs">
                <span className="font-semibold text-slate-400 block">LinkedIn:</span>
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
            {personal.github && (
              <p className="break-all text-xs">
                <span className="font-semibold text-slate-400 block">GitHub:</span>
                <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.github.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
            {personal.website && (
              <p className="break-all text-xs">
                <span className="font-semibold text-slate-400 block">{t.lblWebsite}:</span>
                <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Skills Section (Hard & Soft) */}
        {(skills.length > 0 || (hardSkills && hardSkills.length > 0)) && (
          <div className="break-inside-avoid">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2" style={{ color: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblHardSkills || t.lblSkills}</h2>
            
            {/* Categorized Hard Skills */}
            {hardSkills && hardSkills.length > 0 ? (
              <div className="space-y-4">
                {hardSkills.map((cat, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-slate-400 mb-1">{cat.category}</h3>
                    <p className="text-sm text-slate-300">{cat.items}</p>
                  </div>
                ))}
              </div>
            ) : (
              /* Legacy Simple Skills */
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-slate-800 px-3 py-1 rounded text-sm text-slate-200" style={{ borderLeft: `2px solid ${accentColor}` }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {softSkills && softSkills.length > 0 && (
          <div className="break-inside-avoid">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2" style={{ color: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblSoftSkills}</h2>
             <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <span key={index} className="bg-slate-800 px-3 py-1 rounded text-sm text-slate-200" style={{ borderLeft: `2px solid ${accentColor}` }}>
                    {skill}
                  </span>
                ))}
             </div>
          </div>
        )}
        
        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="break-inside-avoid">
             <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2" style={{ color: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblLanguages}</h2>
             <ul className="space-y-2 text-sm text-slate-300">
               {languages.map((lang, idx) => (
                 <li key={idx} className="flex justify-between">
                   <span className="font-semibold">{lang.language}</span>
                   <span className="text-slate-400">{lang.level}</span>
                 </li>
               ))}
             </ul>
          </div>
        )}
      </div>

      {/* Main Content / Right Column */}
      <div className="p-6 print:p-0 flex flex-col" style={gapStyle}>
        <div className="mb-10 break-inside-avoid">
          <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-2" style={{ color: accentColor, ...titleStyle }}>
            <EditableText 
              value={personal.name} 
              onChange={(val) => handlePersonalUpdate('name', val)}
              placeholder="Nombre Completo"
            />
          </h1>
          <div className="text-xl text-slate-600 font-light">
             <EditableText 
              value={personal.role} 
              onChange={(val) => handlePersonalUpdate('role', val)}
              placeholder="Cargo / Título"
            />
          </div>
        </div>

        <div className="mb-8 break-inside-avoid">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
            {t.lblProfile}
          </h2>
          <div className="text-slate-600 leading-relaxed whitespace-pre-line">
            <EditableText 
              value={personal.summary} 
              onChange={(val) => handlePersonalUpdate('summary', val)}
              multiline={true}
              placeholder={t.pendingSummary}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
            {t.lblExperience}
          </h2>
          {experience.length === 0 ? (
            <p className="text-gray-400 italic">{t.noExperience}</p>
          ) : (
             experience.map((exp, i) => (
               <div key={i} className="mb-4 break-inside-avoid">
                 <h3 className="font-bold text-lg" style={{ color: accentColor }}>{exp.role}</h3>
                 <p className="text-slate-500">{exp.company} | {formatDateRange(exp.duration, t, language)}</p>
                 <p className="mt-2 text-slate-600 whitespace-pre-line">{exp.description}</p>
               </div>
             ))
          )}
        </div>

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
               {t.lblProjects}
             </h2>
             {projects.map((proj, i) => (
               <div key={i} className="mb-4 break-inside-avoid">
                 <div className="flex justify-between items-baseline">
                   <h3 className="font-bold text-lg" style={{ color: accentColor }}>{proj.name}</h3>
                   {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{proj.link}</a>}
                 </div>
                 {proj.image && (
                   <div className="mb-3 rounded overflow-hidden border border-slate-200 mt-2 shadow-sm">
                     <img src={proj.image} alt={proj.name} className="w-full h-40 object-cover" />
                   </div>
                 )}
                 <p className="text-sm font-medium text-slate-700 mb-1">{proj.technologies}</p>
                 <p className="text-slate-600 whitespace-pre-line">{proj.description}</p>
               </div>
             ))}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
            {t.lblEducation}
          </h2>
          {education.length === 0 ? (
            <p className="text-gray-400 italic">{t.noEducation}</p>
          ) : (
            education.map((edu, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <h3 className="font-bold text-lg" style={{ color: accentColor }}>{edu.degree}</h3>
                <p className="text-slate-500">{edu.school} | {formatDateRange(edu.year, t, language)}</p>
              </div>
            ))
          )}
        </div>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor }}>
               {t.lblCertifications}
             </h2>
             {certifications.map((cert, i) => (
               <div key={i} className="mb-2 break-inside-avoid">
                 <h3 className="font-bold text-slate-800">{cert.name}</h3>
                 <p className="text-sm text-slate-600">{cert.issuer} | {formatDateRange(cert.date, t, language)}</p>
               </div>
             ))}
          </div>
        )}

        {(referencesAvailableOnRequest || (references && references.length > 0)) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor }}>
              {t.lblReferences}
            </h2>
            
            {referencesAvailableOnRequest ? (
               <p className="text-slate-600 italic">{t.availableOnRequest}</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded border-l-4 break-inside-avoid" style={{ borderColor: accentColor }}>
                    <h3 className="font-bold text-slate-800">{ref.name}</h3>
                    {ref.profession && <p className="text-sm font-semibold text-slate-700">{ref.profession}</p>}
                    <p className="text-sm text-slate-600 font-medium">{ref.role}</p>
                    <p className="text-xs text-slate-500">{ref.company}</p>
                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      {ref.email && <div>{ref.email}</div>}
                      {ref.phone && <div>{ref.phone}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernDark;
