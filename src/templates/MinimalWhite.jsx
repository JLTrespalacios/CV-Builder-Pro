import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';

const MinimalWhite = ({ data, color }) => {
  const { language } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
  const accentColor = color || '#111827'; // Default gray-900

  return (
    <div className="w-full min-h-full bg-white text-gray-800 font-sans p-12">
      {/* Header */}
      <header className="border-b-2 pb-8 mb-8 flex justify-between items-start" style={{ borderColor: accentColor }}>
        <div>
          <h1 className="text-5xl font-bold uppercase tracking-tight mb-2" style={{ color: accentColor }}>
            {personal.name}
          </h1>
          <p className="text-xl text-gray-500 font-light uppercase tracking-widest mb-4">{personal.role}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium uppercase tracking-wider">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.documentNumber && <span>• {getDocumentTypeLabel(personal.documentType, t) || 'ID'}: {personal.documentNumber}</span>}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
            {personal.linkedin && <span>LinkedIn: {personal.linkedin.replace(/^https?:\/\//, '')}</span>}
            {personal.github && <span>• GitHub: {personal.github.replace(/^https?:\/\//, '')}</span>}
            {personal.website && <span>• {t.lblWebsite}: {personal.website.replace(/^https?:\/\//, '')}</span>}
          </div>
        </div>
        {personal.showPhoto && personal.photo && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2" style={{ borderColor: accentColor }}>
             <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="grid grid-cols-[2fr_1fr] gap-12">
        {/* Main Column */}
        <div>
          {/* Profile */}
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblProfile}</h2>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {personal.summary || t.pendingSummary}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblExperience}</h2>
            <div className="space-y-8">
              {experience.length === 0 ? (
                <p className="text-gray-400 italic">{t.noExperience}</p>
              ) : (
                experience.map((exp, i) => (
                  <div key={i} className="break-inside-avoid">
                    <h3 className="font-bold text-xl" style={{ color: accentColor }}>{exp.role}</h3>
                    <div className="text-gray-500 font-medium mb-2">
                      {exp.company} | {exp.duration}
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblProjects}</h2>
              <div className="space-y-8">
                  {projects.map((proj, i) => (
                    <div key={i} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-xl" style={{ color: accentColor }}>{proj.name}</h3>
                          {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{proj.link}</a>}
                      </div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">{proj.technologies}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {proj.description}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          )}
          
           {/* Education */}
           <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblEducation}</h2>
            <div className="space-y-6">
              {education.length === 0 ? (
                <p className="text-gray-400 italic">{t.noEducation}</p>
              ) : (
                education.map((edu, i) => (
                  <div key={i} className="break-inside-avoid">
                    <h3 className="font-bold text-lg" style={{ color: accentColor }}>{edu.degree}</h3>
                    <div className="text-gray-500">
                      {edu.school} | {edu.year}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblCertifications}</h2>
              <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="break-inside-avoid">
                      <h3 className="font-bold text-lg" style={{ color: accentColor }}>{cert.name}</h3>
                      <div className="text-gray-500">
                        {cert.issuer} | {formatDateRange(cert.date, t, language)}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <div>
           {/* Hard Skills */}
           <section className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblHardSkills || t.lblSkills}</h2>
            {hardSkills && hardSkills.length > 0 ? (
                <div className="space-y-6">
                  {hardSkills.map((cat, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">{cat.category}</h3>
                      <div className="flex flex-col gap-1">
                          {cat.items.split(',').map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                <span className="text-gray-700 font-medium text-sm">{item.trim()}</span>
                              </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 break-inside-avoid">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
            )}
          </section>

          {/* Soft Skills */}
           {softSkills && softSkills.length > 0 && (
             <section className="mb-12">
               <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblSoftSkills}</h2>
               <div className="flex flex-col gap-2">
                  {softSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 break-inside-avoid">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
               </div>
             </section>
           )}

           {/* Languages */}
           {languages && languages.length > 0 && (
             <section className="mb-12">
               <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblLanguages}</h2>
               <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center text-sm break-inside-avoid">
                       <span className="font-bold text-gray-700">{lang.language}</span>
                       <span className="text-gray-500 italic">{lang.level}</span>
                    </div>
                  ))}
               </div>
             </section>
           )}

           {/* References */}
           {(referencesAvailableOnRequest || (references && references.length > 0)) && (
            <section className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblReferences}</h2>
              
              {referencesAvailableOnRequest ? (
                <p className="text-sm text-gray-500 italic">{t.availableOnRequest}</p>
              ) : (
                <div className="space-y-6">
                  {references.map((ref, i) => (
                    <div key={i} className="break-inside-avoid">
                      <h3 className="font-bold text-gray-800" style={{ color: accentColor }}>{ref.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{ref.role} {ref.company && `| ${ref.company}`}</p>
                      <div className="text-xs text-gray-500">
                        {ref.phone && <div className="mb-0.5">{ref.phone}</div>}
                        {ref.email && <div>{ref.email}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default MinimalWhite;
