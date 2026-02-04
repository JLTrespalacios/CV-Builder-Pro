import React from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';

const AcademicAPA = ({ data }) => {
  const { language } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, certifications, projects, languages, referencesAvailableOnRequest } = data;

  // APA Norms:
  // - Margins: 2.54 cm (approx 1 inch). We'll use padding-10 (2.5rem which is close to 2.54cm)
  // - Font: Times New Roman (font-serif) or Arial (font-sans). We'll use Serif for classic APA look.
  // - Line Spacing: Usually double (leading-loose) or 1.5. We'll use relaxed for CV readability.
  // - Alignment: Left aligned generally.
  
  return (
    <div className="w-full min-h-full bg-white text-black font-serif p-[2.54cm] leading-relaxed">
      {/* Header / Personal Info */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{personal.name}</h1>
        <div className="text-base space-y-1">
          <p>
            {personal.location} {personal.phone && `| ${personal.phone}`} {personal.email && `| ${personal.email}`}
          </p>
          {personal.linkedin && (
             <p>
               <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">
                 {personal.linkedin.replace(/^https?:\/\//, '')}
               </a>
             </p>
          )}
          {personal.github && (
             <p>GitHub: <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">{personal.github.replace(/^https?:\/\//, '')}</a></p>
          )}
          {personal.website && (
             <p>
               <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-900">
                 {personal.website.replace(/^https?:\/\//, '')}
               </a>
             </p>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblProfile}</h2>
        <p className="text-justify indent-8">
          {personal.summary || t.pendingSummary}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblExperience}</h2>
        <div className="space-y-6">
          {experience.length === 0 ? (
            <p className="italic text-gray-500">{t.noExperience}</p>
          ) : (
            experience.map((exp, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className="text-sm">{exp.duration}</span>
                </div>
                <p className="italic mb-2">{exp.company}</p>
                <p className="text-justify indent-8">
                  {exp.description}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Projects (Added) */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblProjects}</h2>
          <div className="space-y-6">
             {projects.map((proj, i) => (
               <div key={i} className="break-inside-avoid">
                 <div className="flex justify-between items-baseline mb-1">
                   <h3 className="font-bold">{proj.name}</h3>
                   {proj.link && <a href={proj.link} className="text-sm underline text-blue-900">{proj.link}</a>}
                 </div>
                 <p className="italic mb-1 text-sm">{proj.technologies}</p>
                 <p className="text-justify indent-8">
                   {proj.description}
                 </p>
               </div>
             ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblEducation}</h2>
        <div className="space-y-4">
          {education.length === 0 ? (
            <p className="italic text-gray-500">{t.noEducation}</p>
          ) : (
            education.map((edu, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.school}</h3>
                  <span className="text-sm">{formatDateRange(edu.year, t, language)}</span>
                </div>
                <p className="italic">{edu.degree}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblCertifications}</h2>
          <ul className="list-disc pl-8">
            {certifications.map((cert, i) => (
              <li key={i} className="break-inside-avoid">
                <span className="font-bold">{cert.name}</span>, {cert.issuer} ({cert.date}).
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages (Added) */}
      {languages && languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblLanguages}</h2>
          <ul className="list-disc pl-8">
            {languages.map((lang, i) => (
              <li key={i} className="break-inside-avoid">
                <span className="font-bold">{lang.language}</span>: {lang.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblSkills}</h2>
        <p className="leading-relaxed text-justify">
          {skills.length > 0 ? skills.join(', ') + '.' : <span className="italic text-gray-500">{t.noSkills}</span>}
        </p>
      </section>

      {/* References */}
      {(referencesAvailableOnRequest || (references && references.length > 0)) && (
        <section>
          <h2 className="text-lg font-bold border-b-2 border-black mb-4" style={{ breakAfter: 'avoid' }}>{t.lblReferences}</h2>
          
          {referencesAvailableOnRequest ? (
            <p className="italic">{t.availableOnRequest}.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {references.map((ref, i) => (
                <div key={i} className="break-inside-avoid">
                  <h3 className="font-bold">{ref.name}</h3>
                  {ref.profession && <p className="text-sm font-semibold">{ref.profession}</p>}
                  <p className="italic">{ref.role} {ref.company && `- ${ref.company}`}</p>
                  <div className="text-sm mt-1">
                    {ref.phone && <p>{t.lblPhone}: {ref.phone}</p>}
                    {ref.email && <p>Email: {ref.email}</p>}
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

export default AcademicAPA;
