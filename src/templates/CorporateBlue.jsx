import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';
import { EditableText } from '../components/ui/EditableText';

const CorporateBlue = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, hardSkills, softSkills, languages, certifications } = data;
  const accentColor = themeColor || color || '#1e3a8a'; // Default blue-900

  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const containerStyle = {
    paddingTop: `${design?.marginTop || 0}px`,
    fontSize: `${design?.fontSize || 16}px`
  };

  const gapStyle = {
      gap: `${design?.sectionGap || 32}px`
  };

  return (
    <div 
      className="w-full h-full bg-white text-gray-800 font-sans min-h-full flex flex-col"
      style={containerStyle}
    >
      {/* Header */}
      <header className="text-white p-10 print:p-0 flex justify-between items-center" style={{ backgroundColor: accentColor }}>
        <div>
          <div className="mb-2">
            <EditableText
              value={personal.name}
              onChange={(val) => handlePersonalUpdate('name', val)}
              className="text-4xl font-bold uppercase tracking-wide"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-0">
             <EditableText
              value={personal.role}
              onChange={(val) => handlePersonalUpdate('role', val)}
              className="text-lg tracking-widest uppercase opacity-80"
              placeholder="Cargo / Título"
            />
          </div>
        </div>
        {personal.showPhoto && personal.photo && (
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="flex flex-1">
        {/* Left Column (Contact & Skills) */}
        <aside className="w-1/3 bg-slate-100 p-8 border-r border-slate-200 flex flex-col" style={gapStyle}>
          <div className="break-inside-avoid">
            <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid' }}>
              {t.lblContact}
            </h3>
            <div className="text-sm space-y-3 text-slate-600">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{t.lblEmail}</span>
                <EditableText
                    value={personal.email}
                    onChange={(val) => handlePersonalUpdate('email', val)}
                    placeholder="Email"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{t.lblPhone}</span>
                <EditableText
                    value={personal.phone}
                    onChange={(val) => handlePersonalUpdate('phone', val)}
                    placeholder="Teléfono"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{t.lblLocation}</span>
                <EditableText
                    value={personal.location}
                    onChange={(val) => handlePersonalUpdate('location', val)}
                    placeholder="Ubicación"
                />
              </div>
              {personal.documentNumber && (
                <p className="flex flex-col">
                  <span className="font-semibold text-slate-800">{getDocumentTypeLabel(personal.documentType, t) || 'ID'}</span>
                  {personal.documentNumber}
                </p>
              )}
              {personal.linkedin && (
                <p className="flex flex-col">
                  <span className="font-semibold text-slate-800">LinkedIn</span>
                  <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="break-all text-xs underline hover:text-blue-800" style={{ color: accentColor }}>
                    {personal.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </p>
              )}
              {personal.github && (
                <p className="flex flex-col">
                  <span className="font-semibold text-slate-800">GitHub</span>
                  <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="break-all text-xs underline hover:text-blue-800" style={{ color: accentColor }}>
                    {personal.github.replace(/^https?:\/\//, '')}
                  </a>
                </p>
              )}
              {personal.website && (
                <p className="flex flex-col">
                  <span className="font-semibold text-slate-800">{t.lblWebsite}</span>
                  <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="break-all text-xs underline hover:text-blue-800" style={{ color: accentColor }}>
                    {personal.website.replace(/^https?:\/\//, '')}
                  </a>
                </p>
              )}
            </div>
          </div>

          {(skills.length > 0 || (hardSkills && hardSkills.length > 0)) && (
            <div className="mb-8 break-inside-avoid">
              <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid' }}>
                {t.lblHardSkills || t.lblSkills}
              </h3>
              
              {hardSkills && hardSkills.length > 0 ? (
                <div className="space-y-4">
                  {hardSkills.map((cat, idx) => (
                    <div key={idx}>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{cat.category}</h4>
                      <ul className="space-y-1">
                        {cat.items.split(',').map((item, i) => (
                          <li key={i} className="text-slate-700 text-sm font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
                            {item.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {skills.map((skill, index) => (
                    <li key={index} className="text-slate-700 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {softSkills && softSkills.length > 0 && (
            <div className="mb-8 break-inside-avoid">
              <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid' }}>
                {t.lblSoftSkills}
              </h3>
              <ul className="space-y-2">
                {softSkills.map((skill, index) => (
                  <li key={index} className="text-slate-700 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="mb-8 break-inside-avoid">
              <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid' }}>
                {t.lblLanguages}
              </h3>
              <ul className="space-y-3">
                {languages.map((lang, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="font-bold text-slate-700 text-sm">{lang.language}</span>
                    <span className="text-xs text-slate-500">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Column (Experience & Education) */}
        <main className="w-2/3 p-8 print:p-0 flex flex-col" style={gapStyle}>
          <section>
            <h3 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
              <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span> {t.lblProfile}
            </h3>
            <div className="text-slate-600 leading-relaxed text-justify">
               <EditableText
                value={personal.summary}
                onChange={(val) => handlePersonalUpdate('summary', val)}
                multiline={true}
                placeholder={t.pendingSummary}
              />
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
              <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span> {t.lblExperience}
            </h3>
            <div className="space-y-6">
              {experience.length === 0 ? (
                <p className="text-gray-400 italic">{t.noExperience}</p>
              ) : (
                experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-200 break-inside-avoid">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 rounded-full" style={{ borderColor: accentColor }}></div>
                    <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                    <div className="font-semibold text-sm mb-2" style={{ color: accentColor }}>
                      {exp.company} | {exp.duration}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
              <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span> {t.lblEducation}
            </h3>
            <div className="grid gap-4">
              {education.length === 0 ? (
                <p className="text-gray-400 italic">{t.noEducation}</p>
              ) : (
                education.map((edu, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded border-l-4 break-inside-avoid" style={{ borderColor: accentColor }}>
                    <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                    <p className="text-slate-600 text-sm">{edu.school}</p>
                    <span className="text-xs font-mono mt-1 block" style={{ color: accentColor, opacity: 0.8 }}>{formatDateRange(edu.year, t, language)}</span>
                  </div>
                ))
              )}
            </div>
          </section>

          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor }}>
                <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span> {t.lblCertifications}
              </h3>
              <div className="grid gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded border-l-4" style={{ borderColor: accentColor }}>
                    <h4 className="font-bold text-slate-800">{cert.name}</h4>
                    <p className="text-slate-600 text-sm">{cert.issuer}</p>
                    <span className="text-xs font-mono mt-1 block" style={{ color: accentColor, opacity: 0.8 }}>{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(data.referencesAvailableOnRequest || (references && references.length > 0)) && (
            <section>
              <h3 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor }}>
                <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span> {t.lblReferences}
              </h3>
              {data.referencesAvailableOnRequest ? (
                <p className="text-slate-600 italic">{t.availableOnRequest}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {references.map((ref, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded border border-slate-100">
                      <h4 className="font-bold text-slate-800">{ref.name}</h4>
                      {ref.profession && <p className="text-sm font-medium text-slate-700">{ref.profession}</p>}
                      <p className="text-sm font-semibold" style={{ color: accentColor }}>{ref.role}</p>
                      <p className="text-xs text-slate-500 mb-2">{ref.company}</p>
                      <div className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-2 mt-2">
                        {ref.phone && <div>{t.lblPhone}: {ref.phone}</div>}
                        {ref.email && <div>{t.lblEmail}: {ref.email}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CorporateBlue;
