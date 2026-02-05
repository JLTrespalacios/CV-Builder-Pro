import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';
import { EditableText } from '../components/ui/EditableText';

const TechGamer = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, certifications, languages, referencesAvailableOnRequest } = data;

  const accentColor = themeColor || color || '#00ff00'; // Default green

  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const containerStyle = {
    borderTopColor: accentColor,
    background: 'linear-gradient(to right, #0f0f0f 33.333%, #0a0a0a 33.333%)',
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
    paddingTop: `${design?.marginTop || 0}px`,
    fontSize: `${design?.fontSize || 16}px`
  };

  const gapStyle = {
      gap: `${design?.sectionGap || 32}px`
  };

  return (
    <div 
      className="w-full min-h-full text-gray-300 font-mono flex flex-col border-t-8" 
      style={containerStyle}
    >
      {/* Header */}
      <header className="p-8 print:p-0 flex items-center justify-between border-b border-gray-800 bg-[#111] z-10 relative">
        <div>
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tighter flex items-center">
            <span style={{ color: accentColor }}>&lt;</span>
            <EditableText
              value={personal.name}
              onChange={(val) => handlePersonalUpdate('name', val)}
              className="mx-1"
              placeholder="Nombre"
            />
            <span style={{ color: accentColor }}>/&gt;</span>
          </h1>
          <div className="text-sm uppercase tracking-widest" style={{ color: accentColor }}>
             <EditableText
              value={personal.role}
              onChange={(val) => handlePersonalUpdate('role', val)}
              placeholder="Full Stack Developer"
            />
          </div>
        </div>
        {personal.showPhoto && personal.photo && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 shadow-lg" style={{ borderColor: accentColor, boxShadow: `0 0 15px ${accentColor}40` }}>
             <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        )}
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/3 p-6 print:p-0 border-r border-gray-800 flex flex-col" style={gapStyle}>
          <div className="break-inside-avoid">
            <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Stats
            </h3>
            <div className="space-y-4 text-sm font-light">
              <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                <span className="text-gray-500 block text-xs uppercase mb-1">{t.lblEmail}</span>
                <span className="text-white break-all">
                    <EditableText
                        value={personal.email}
                        onChange={(val) => handlePersonalUpdate('email', val)}
                        placeholder="Email"
                    />
                </span>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                <span className="text-gray-500 block text-xs uppercase mb-1">{t.lblPhone}</span>
                <span className="text-white">
                    <EditableText
                        value={personal.phone}
                        onChange={(val) => handlePersonalUpdate('phone', val)}
                        placeholder="Teléfono"
                    />
                </span>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                <span className="text-gray-500 block text-xs uppercase mb-1">{t.lblLocation}</span>
                <span className="text-white">
                    <EditableText
                        value={personal.location}
                        onChange={(val) => handlePersonalUpdate('location', val)}
                        placeholder="Ubicación"
                    />
                </span>
              </div>
              {personal.documentNumber && (
                <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                  <span className="text-gray-500 block text-xs uppercase mb-1">{getDocumentTypeLabel(personal.documentType, t) || 'ID'}</span>
                  <span className="text-white">{personal.documentNumber}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                  <span className="text-gray-500 block text-xs uppercase mb-1">LinkedIn</span>
                  <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} className="hover:underline break-all block truncate" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">
                    {personal.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personal.github && (
                <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                  <span className="text-gray-500 block text-xs uppercase mb-1">GitHub</span>
                  <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} className="hover:underline break-all block truncate" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">
                    {personal.github.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personal.website && (
                <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                  <span className="text-gray-500 block text-xs uppercase mb-1">{t.lblWebsite}</span>
                  <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} className="hover:underline break-all block truncate" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">
                    {personal.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              {t.lblSkills}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-[#1a1a1a] border text-xs rounded transition-colors cursor-default" style={{ borderColor: accentColor, color: accentColor }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {languages && languages.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: accentColor }}></span>
                {t.lblLanguages}
              </h3>
              <ul className="space-y-2">
                {languages.map((lang, idx) => (
                  <li key={idx} className="flex justify-between text-xs border-b border-gray-800 pb-1">
                    <span className="text-gray-300">{lang.language}</span>
                    <span className="font-mono" style={{ color: accentColor }}>{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(referencesAvailableOnRequest || (references && references.length > 0)) && (
            <div className="mt-8">
              <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: accentColor }}></span>
                {t.lblReferences}
              </h3>
              {referencesAvailableOnRequest ? (
                <p className="text-gray-400 font-mono italic text-xs">&lt; {t.availableOnRequest} /&gt;</p>
              ) : (
                <div className="space-y-4">
                  {references.map((ref, i) => (
                    <div key={i} className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                      <span className="text-white block font-bold text-xs mb-1" style={{ color: accentColor }}>{ref.name}</span>
                      {ref.profession && <span className="text-gray-300 block text-xs font-semibold mb-0.5">{ref.profession}</span>}
                      <span className="text-gray-400 block text-xs">{ref.role}</span>
                      {ref.company && <span className="text-gray-500 block text-xs italic">{ref.company}</span>}
                      {(ref.phone || ref.email) && (
                         <div className="mt-2 pt-2 border-t border-gray-800 text-[10px] text-gray-500 font-mono">
                           {ref.phone && <div>T: {ref.phone}</div>}
                           {ref.email && <div>E: {ref.email}</div>}
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-8 print:p-0">
          <section className="mb-10 break-inside-avoid">
            <h3 className="text-white font-bold uppercase mb-6 text-sm tracking-[0.2em] border-b border-gray-800 pb-2">
              // {t.lblProfile}
            </h3>
            <div className="text-gray-400 text-sm leading-relaxed p-4 bg-[#111] border-l-2" style={{ borderLeftColor: accentColor }}>
              {personal.summary || t.pendingSummary}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-white font-bold uppercase mb-6 text-sm tracking-[0.2em] border-b border-gray-800 pb-2">
              // {t.lblExperience}
            </h3>
            <div className="space-y-8">
              {experience.length === 0 ? (
                <p className="text-gray-600 text-sm font-mono">{t.noExperience}</p>
              ) : (
                experience.map((exp, i) => (
                  <div key={i} className="group break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-white font-bold transition-colors" style={{ color: accentColor }}>{exp.role}</h4>
                      <span className="text-xs text-gray-500 font-mono">[{exp.duration}]</span>
                    </div>
                    <div className="text-xs uppercase tracking-wider mb-3" style={{ color: accentColor, opacity: 0.8 }}>{exp.company}</div>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {projects && projects.length > 0 && (
            <section className="mb-10">
              <h3 className="text-white font-bold uppercase mb-6 text-sm tracking-[0.2em] border-b border-gray-800 pb-2">
                // {t.lblProjects}
              </h3>
              <div className="space-y-6">
                 {projects.map((proj, i) => (
                   <div key={i} className="group bg-[#111] p-4 rounded border-l-2 break-inside-avoid" style={{ borderLeftColor: accentColor }}>
                     <div className="flex justify-between items-baseline mb-2">
                       <h4 className="text-white font-bold transition-colors text-lg" style={{ color: accentColor }}>{proj.name}</h4>
                       {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline font-mono">&lt;Link /&gt;</a>}
                     </div>
                     <p className="text-xs font-mono mb-3 opacity-70" style={{ color: accentColor }}>{proj.technologies}</p>
                     <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line font-sans">
                       {proj.description}
                     </p>
                   </div>
                 ))}
              </div>
            </section>
          )}

          <section className="mb-10 break-inside-avoid">
            <h3 className="text-white font-bold uppercase mb-6 text-sm tracking-[0.2em] border-b border-gray-800 pb-2">
              // {t.lblEducation}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {education.map((edu, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-[#111] rounded border border-gray-800 transition-colors">
                  <div className="w-10 h-10 bg-[#000] rounded flex items-center justify-center font-bold border border-gray-800" style={{ color: accentColor }}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{edu.degree}</h4>
                    <p className="text-gray-500 text-xs">{edu.school} • <span style={{ color: accentColor }}>{formatDateRange(edu.year, t, language)}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <section className="break-inside-avoid">
              <h3 className="text-white font-bold uppercase mb-6 text-sm tracking-[0.2em] border-b border-gray-800 pb-2">
                // {t.lblCertifications}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="bg-[#111] p-3 rounded border-l-4 border-gray-800 flex justify-between items-center" style={{ borderLeftColor: accentColor }}>
                    <div>
                      <h4 className="text-white font-bold text-sm">{cert.name}</h4>
                      <p className="text-gray-500 text-xs font-mono">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-black border border-gray-800" style={{ color: accentColor }}>
                      {formatDateRange(cert.date, t, language)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TechGamer;
