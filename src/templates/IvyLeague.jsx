import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange } from '../utils/formatters';

const IvyLeague = ({ data }) => {
  const { language } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;

  return (
    <div className="w-full h-full bg-white text-black font-serif p-10 min-h-full text-sm leading-snug">
      {/* Header */}
      <header className="text-center mb-6 border-b border-black pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">{personal.name}</h1>
        <div className="flex justify-center gap-3 text-sm flex-wrap">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.email && <span>• {personal.email}</span>}
          {personal.linkedin && <span>• {personal.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personal.github && <span>• {personal.github.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Education - Often comes first in Ivy League style if recent grad, but we'll stick to standard order or put it top if requested. We'll follow standard CV flow here but Education is high priority. */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3" style={{ breakAfter: 'avoid' }}>{t.lblEducation}</h2>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <span>{edu.school}</span>
                  <span>{formatDateRange(edu.year, t, language)}</span>
                </div>
                <div className="flex justify-between italic">
                  <span>{edu.degree}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-3" style={{ breakAfter: 'avoid' }}>{t.lblExperience}</h2>
        <div className="space-y-4">
          {experience.length === 0 ? (
            <p className="italic text-gray-500">{t.noExperience}</p>
          ) : (
            experience.map((exp, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{exp.company}</span>
                  <span>{formatDateRange(exp.duration, t, language)}</span>
                </div>
                <div className="italic mb-1">{exp.role}</div>
                <p className="text-justify text-gray-800">
                  {exp.description}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3" style={{ breakAfter: 'avoid' }}>{t.lblProjects}</h2>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{proj.name}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs font-normal italic hover:underline">
                      {proj.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                {proj.technologies && <div className="italic text-xs mb-1">{proj.technologies}</div>}
                <p className="text-justify text-gray-800">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Additional Info */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-3" style={{ breakAfter: 'avoid' }}>{t.lblSkills} & {t.lblProfile}</h2>
        <div className="space-y-1">
          {hardSkills && hardSkills.length > 0 ? (
             <div>
                <span className="font-bold">{t.lblHardSkills}: </span>
                <span>{hardSkills.map(cat => `${cat.category} (${cat.items})`).join('; ')}</span>
             </div>
          ) : skills.length > 0 && (
             <div>
                <span className="font-bold">{t.lblSkills}: </span>
                <span>{skills.join(', ')}</span>
             </div>
          )}

          {softSkills && softSkills.length > 0 && (
            <div>
              <span className="font-bold">{t.lblSoftSkills}: </span>
              <span>{softSkills.join(', ')}</span>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <span className="font-bold">{t.lblLanguages}: </span>
              <span>{languages.map(l => `${l.language} (${l.level})`).join(', ')}</span>
            </div>
          )}

          {personal.summary && (
            <p className="mt-2">
              <span className="font-bold">{t.lblProfile}:</span> {personal.summary}
            </p>
          )}
        </div>
      </section>

      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3" style={{ breakAfter: 'avoid' }}>{t.lblCertifications}</h2>
          <ul className="list-disc pl-5">
            {certifications.map((cert, i) => (
              <li key={i} className="break-inside-avoid">
                <span className="font-bold">{cert.name}</span> — {cert.issuer} ({formatDateRange(cert.date, t, language)})
              </li>
            ))}
          </ul>
        </section>
      )}

       {/* References */}
       {(referencesAvailableOnRequest || (references && references.length > 0)) && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-3" style={{ breakAfter: 'avoid' }}>{t.lblReferences}</h2>
          
          {referencesAvailableOnRequest ? (
            <p className="italic text-gray-600">{t.availableOnRequest}.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref, i) => (
                <div key={i} className="break-inside-avoid">
                  <div className="font-bold">{ref.name}</div>
                  <div className="italic text-xs">{ref.role} {ref.company && `- ${ref.company}`}</div>
                  <div className="text-xs">
                    {ref.phone && <span>{ref.phone} • </span>}
                    {ref.email && <span>{ref.email}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default IvyLeague;
