import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange } from '../utils/formatters';

const ExecutiveGray = ({ data, color }) => {
  const { language } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
  const accentColor = color || '#374151'; // Default gray-700

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans grid grid-cols-[1fr_2fr] min-h-full">
      
      {/* Sidebar */}
      <div className="bg-gray-100 p-8 border-r border-gray-200 flex flex-col gap-10">
        
        {/* Photo & Contact */}
        <div className="text-center break-inside-avoid">
           {personal.showPhoto && personal.photo && (
            <div className="w-40 h-40 mx-auto mb-6 rounded shadow-lg overflow-hidden grayscale">
               <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="text-left space-y-3 text-sm text-gray-600 mt-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 w-16">{t.lblEmail}</span>
              <span className="truncate">{personal.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 w-16">{t.lblPhone}</span>
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 w-16">{t.lblLocation}</span>
              <span>{personal.location}</span>
            </div>
             {personal.linkedin && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-16">LinkedIn</span>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                  {personal.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-16">GitHub</span>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                  {personal.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-16">Web</span>
                <a href={personal.website} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                  {personal.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="uppercase tracking-widest font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
            {t.lblEducation}
          </h3>
          <div className="space-y-4">
            {education.length === 0 ? (
              <p className="text-gray-400 italic text-sm">{t.noEducation}</p>
            ) : (
              education.map((edu, i) => (
                <div key={i}>
                  <div className="font-bold text-gray-800">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  <div className="text-xs text-gray-500 mt-1">{edu.year}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3 className="uppercase tracking-widest font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
              {t.lblCertifications}
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div key={i}>
                  <div className="font-bold text-gray-800 text-sm">{cert.name}</div>
                  <div className="text-xs text-gray-600">{cert.issuer}</div>
                  <div className="text-xs text-gray-500">{formatDateRange(cert.date, t, language)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        <div>
          <h3 className="uppercase tracking-widest font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
            {t.lblSkills}
          </h3>
          
          {hardSkills && hardSkills.length > 0 ? (
            <div className="space-y-4">
              {hardSkills.map((cat, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">{cat.category}</h4>
                  <ul className="space-y-1">
                    {cat.items.split(',').map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  {skill}
                </li>
              ))}
            </ul>
          )}

          {softSkills && softSkills.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">{t.lblSoftSkills}</h4>
              <ul className="space-y-1">
                {softSkills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">{t.lblLanguages}</h4>
              <ul className="space-y-2">
                {languages.map((lang, i) => (
                  <li key={i} className="flex flex-col text-sm">
                    <span className="text-gray-800 font-medium">{lang.language}</span>
                    <span className="text-gray-500 text-xs">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-10 flex flex-col">
        {/* Header */}
        <header className="mb-12 border-b-4 pb-6" style={{ borderColor: accentColor }}>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2 tracking-tight">
            {personal.name.toUpperCase()}
          </h1>
          <p className="text-xl text-gray-500 font-light uppercase tracking-wider">
            {personal.role}
          </p>
        </header>

        {/* Profile */}
        <section className="mb-10 break-inside-avoid">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
            {t.lblProfile}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg font-light">
            {personal.summary}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10 flex-1">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
            {t.lblExperience}
          </h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="group break-inside-avoid">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                </div>
                <div className="text-base font-semibold text-gray-600 mb-3" style={{ color: accentColor }}>
                  {exp.company}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
              {t.lblProjects}
            </h2>
            <div className="space-y-8">
              {projects.map((proj, i) => (
                <div key={i} className="group break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-500 mb-3 italic">
                    {proj.technologies}
                  </div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {(referencesAvailableOnRequest || (references && references.length > 0)) && (
          <section className="mt-auto pt-8 border-t border-gray-100 break-inside-avoid">
             <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400" style={{ breakAfter: 'avoid' }}>
              {t.lblReferences}
            </h2>
            
            {referencesAvailableOnRequest ? (
               <p className="text-gray-500 italic text-sm">{t.availableOnRequest}</p>
            ) : (
              <div className="flex flex-wrap gap-8">
                {references.map((ref, i) => (
                  <div key={i} className="min-w-[200px] break-inside-avoid">
                    <div className="font-bold text-gray-800">{ref.name}</div>
                    <div className="text-sm text-gray-600">{ref.role}</div>
                    <div className="text-xs text-gray-400 mt-1">{ref.email || ref.phone}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveGray;
