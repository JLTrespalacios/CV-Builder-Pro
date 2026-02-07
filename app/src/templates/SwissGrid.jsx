import React from 'react';
import { useCVStore } from '../store/cvStore';
import EditableText from '../components/ui/EditableText';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange } from '../utils/formatters';

const SwissGrid = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
  const accentColor = themeColor || color || '#000000';

  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const containerStyle = {
    paddingTop: `${design?.marginTop || 0}px`,
    fontSize: `${design?.fontSize || 16}px`,
    fontFamily: design?.fontFamily || 'Inter',
    color: design?.fontColor || '#000000',
    lineHeight: design?.lineHeight || 1.5
  };

  const gridGapStyle = {
    gap: `${design?.sectionGap || 24}px`
  };

  return (
    <div 
      className="w-full h-full bg-white text-black font-sans p-8 print:p-0 min-h-full"
      style={containerStyle}
    >
      {/* Header Grid */}
      <div 
        className="grid grid-cols-12 mb-16 border-t-8 pt-8" 
        style={{ borderColor: accentColor, ...gridGapStyle }}
      >
        <div className="col-span-8">
          <div className="text-6xl font-black tracking-tighter leading-none mb-4" style={{ color: accentColor }}>
            <EditableText
              value={personal.name}
              onChange={(val) => handlePersonalUpdate('name', val)}
              multiline={true}
              placeholder="YOUR NAME"
            />
          </div>
        </div>
        <div className="col-span-4 text-sm font-medium space-y-1 text-right flex flex-col items-end">
          {personal.showPhoto && (
            <div className="w-24 h-24 mb-4 bg-gray-100 flex items-center justify-center overflow-hidden">
               {personal.photo ? (
                 <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover grayscale" />
               ) : (
                 <span className="text-3xl font-black" style={{ color: accentColor }}>{personal.name ? personal.name.charAt(0) : 'U'}</span>
               )}
            </div>
          )}
          <EditableText value={personal.role} onChange={(val) => handlePersonalUpdate('role', val)} placeholder="Role" />
          <EditableText value={personal.email} onChange={(val) => handlePersonalUpdate('email', val)} placeholder="Email" />
          <EditableText value={personal.phone} onChange={(val) => handlePersonalUpdate('phone', val)} placeholder="Phone" />
          <EditableText value={personal.location} onChange={(val) => handlePersonalUpdate('location', val)} placeholder="Location" />
          {personal.linkedin && <p><a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personal.linkedin.replace(/^https?:\/\//, '')}</a></p>}
          {personal.github && <p>GitHub: <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personal.github.replace(/^https?:\/\//, '')}</a></p>}
          {personal.website && <p><a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personal.website.replace(/^https?:\/\//, '')}</a></p>}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-12" style={gridGapStyle}>
        
        {/* Left Column: Experience */}
        <div className="col-span-8 space-y-12">
          <section>
             <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2" style={{ breakAfter: 'avoid' }}>
              <span className="w-4 h-4" style={{ backgroundColor: accentColor }}></span>
              {t.lblProjects}
            </h2>
            <div className="space-y-8 border-l-2 pl-8 ml-2 border-gray-100">
              {projects && projects.map((proj, i) => (
                <div key={i} className="relative break-inside-avoid">
                   <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white border-4" style={{ borderColor: accentColor }}></div>
                  <h3 className="text-xl font-bold leading-none mb-1">
                    {proj.name}
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-blue-600 hover:underline align-middle">↗</a>}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-800 font-light mt-2">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2" style={{ breakAfter: 'avoid' }}>
              <span className="w-4 h-4" style={{ backgroundColor: accentColor }}></span>
              {t.lblExperience}
            </h2>
            <div className="space-y-10 border-l-2 pl-8 ml-2 border-gray-100">
              {experience.map((exp, i) => (
                <div key={i} className="relative break-inside-avoid">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white border-4" style={{ borderColor: accentColor }}></div>
                  <h3 className="text-2xl font-bold leading-none mb-1">{exp.role}</h3>
                  <p className="text-gray-500 font-medium mb-4">{exp.company} <span className="mx-2">/</span> {formatDateRange(exp.duration, t, language)}</p>
                  <p className="text-lg leading-relaxed text-gray-800 font-light">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2" style={{ breakAfter: 'avoid' }}>
              <span className="w-4 h-4" style={{ backgroundColor: accentColor }}></span>
              {t.lblReferences}
            </h2>
            {(referencesAvailableOnRequest || (references && references.length > 0)) && (
              <>
                {referencesAvailableOnRequest ? (
                  <p className="text-lg font-light italic text-gray-500">{t.availableOnRequest}</p>
                ) : (
                  <div className="grid grid-cols-2 gap-8">
                    {references.map((ref, i) => (
                      <div key={i} className="bg-gray-50 p-6 break-inside-avoid">
                        <h3 className="font-bold text-lg">{ref.name}</h3>
                        {ref.profession && <p className="text-sm font-medium text-gray-700 mb-0.5">{ref.profession}</p>}
                        <p className="text-sm text-gray-500 mb-2">{ref.role} @ {ref.company}</p>
                        <div className="text-sm font-mono">
                          {ref.email && <div>{ref.email}</div>}
                          {ref.phone && <div>{ref.phone}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Right Column: Profile, Skills, Education */}
        <div className="col-span-4 space-y-12">
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
              {t.lblProfile}
            </h2>
            <div className="text-lg font-light leading-relaxed">
               <EditableText
                value={personal.summary}
                onChange={(val) => handlePersonalUpdate('summary', val)}
                multiline={true}
              />
            </div>
          </section>

          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
              {t.lblSkills}
            </h2>
            <div className="flex flex-col gap-4">
              {hardSkills && hardSkills.length > 0 ? (
                hardSkills.map((cat, i) => (
                  <div key={i} className="break-inside-avoid">
                    <h3 className="font-bold text-xs uppercase mb-1 text-gray-500">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(cat.items || '').toString().split(',').map((item, j) => (
                         <span key={j} className="px-3 py-2 bg-gray-100 text-sm font-bold text-gray-800">
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-2 bg-gray-100 text-sm font-bold text-gray-800">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              
              {softSkills && softSkills.length > 0 && (
                <div className="mt-2 break-inside-avoid">
                  <h3 className="font-bold text-xs uppercase mb-1 text-gray-500">{t.lblSoftSkills}</h3>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-2 bg-gray-50 text-sm font-medium text-gray-600 border border-gray-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

               {languages && languages.length > 0 && (
                <div className="mt-2 break-inside-avoid">
                  <h3 className="font-bold text-xs uppercase mb-1 text-gray-500">{t.lblLanguages}</h3>
                  <div className="flex flex-col gap-1">
                    {languages.map((l, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="font-bold">{l.language}</span>
                        <span className="text-gray-500">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
              {t.lblEducation}
            </h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="break-inside-avoid">
                  <h3 className="font-bold text-lg leading-tight mb-1">{edu.degree}</h3>
                  <p className="text-gray-500 text-sm">{edu.school}</p>
                  <p className="text-gray-400 text-xs mt-1">{formatDateRange(edu.year, t, language)}</p>
                </div>
              ))}
            </div>
          </section>

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>
                {t.lblCertifications}
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="break-inside-avoid">
                    <h3 className="font-bold text-base leading-tight mb-1">{cert.name}</h3>
                    <p className="text-gray-500 text-sm">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatDateRange(cert.date, t, language)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwissGrid;
