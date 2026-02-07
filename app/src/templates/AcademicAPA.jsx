import React, { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import EditableText from '../components/ui/EditableText';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';
import { Palette } from 'lucide-react';

const AcademicAPA = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor, updateDesign } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, certifications, projects, languages, referencesAvailableOnRequest } = data;
  const accentColor = themeColor || color || '#000000';
  const { sidebarWidth = 30, sidebarColor = 'transparent' } = design || {};

  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((containerRect.right - e.clientX) / containerRect.width) * 100;
      
      if (newWidth > 20 && newWidth < 50) {
        updateDesign({ sidebarWidth: newWidth });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, updateDesign]);

  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const containerStyle = {
    paddingTop: `${design?.marginTop || 0}px`,
    fontSize: `${design?.fontSize || 16}px`,
    fontFamily: design?.fontFamily || 'Times New Roman, serif',
    color: design?.fontColor || '#000000',
    lineHeight: design?.lineHeight || 1.5
  };

  const gapStyle = {
    gap: `${design?.sectionGap || 24}px`,
    display: 'flex',
    flexDirection: 'column'
  };

  // APA Norms:
  // - Margins: 2.54 cm (approx 1 inch). We'll use padding-12 (3rem)
  // - Font: Times New Roman (font-serif).
  // - Sidebar added for customization request.
  
  return (
    <div 
      className="w-full min-h-full bg-white text-black font-serif p-12 leading-relaxed"
      style={containerStyle}
    >
      {/* Header / Personal Info - Full Width */}
      <header className="text-center mb-8">
        {personal.showPhoto && (
           <div className="w-24 h-24 mx-auto mb-4 rounded border flex items-center justify-center bg-gray-50">
             {personal.photo ? (
               <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
             ) : (
               <span className="text-3xl font-serif font-bold text-gray-400">{personal.name ? personal.name.charAt(0) : 'U'}</span>
             )}
           </div>
        )}
        <div className="text-2xl font-bold mb-2 flex justify-center">
          <EditableText
            value={personal.name}
            onChange={(val) => handlePersonalUpdate('name', val)}
            placeholder="Name"
          />
        </div>
        <div className="text-base flex flex-col items-center">
          <p className="flex items-center gap-1 justify-center flex-wrap">
             <EditableText
              value={personal.location}
              onChange={(val) => handlePersonalUpdate('location', val)}
              placeholder="Location"
            />
            <span>|</span>
            <EditableText
              value={personal.phone}
              onChange={(val) => handlePersonalUpdate('phone', val)}
              placeholder="Phone"
            />
            <span>|</span>
            <EditableText
              value={personal.email}
              onChange={(val) => handlePersonalUpdate('email', val)}
              placeholder="Email"
              className="whitespace-nowrap"
            />
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

      <div 
        ref={containerRef}
        className="grid gap-8"
        style={{
            gridTemplateColumns: `1fr ${sidebarWidth}%`
        }}
      >
        {/* Main Content */}
        <div style={gapStyle}>
          {/* Professional Summary */}
          <section>
            <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblProfile}</h2>
            <div className="text-left indent-8 leading-loose">
              <EditableText
                value={personal.summary}
                onChange={(val) => handlePersonalUpdate('summary', val)}
                multiline={true}
                placeholder={t.pendingSummary}
              />
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblExperience}</h2>
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
                    <p className="text-left indent-8">
                      {exp.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Projects (Added) */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblProjects}</h2>
              <div className="space-y-6">
                 {projects.map((proj, i) => (
                   <div key={i} className="break-inside-avoid">
                     <div className="flex justify-between items-baseline mb-1">
                       <h3 className="font-bold">{proj.name}</h3>
                       {proj.link && <a href={proj.link} className="text-sm underline" style={{ color: accentColor }}>{proj.link}</a>}
                     </div>
                     <p className="italic mb-1 text-sm">{proj.technologies}</p>
                     <p className="text-left indent-8">
                       {proj.description}
                     </p>
                   </div>
                 ))}
              </div>
            </section>
          )}

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblEducation}</h2>
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
        </div>

        {/* Sidebar Content (Skills, Languages, References, Certifications) */}
        <div 
            className="relative group/sidebar p-4 -m-4 rounded transition-colors duration-300"
            style={{ backgroundColor: sidebarColor }}
        >
            {/* Color Picker */}
           <div className="absolute top-2 right-2 z-50 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 print:hidden">
              <div className="relative">
                  <label className="cursor-pointer bg-white/90 hover:bg-white p-1.5 pr-3 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 transition-all hover:scale-105 group">
                      <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                          <Palette size={14} className="text-slate-600" />
                      </div>
                      <span className="text-xs font-medium text-slate-600">Fondo</span>
                      <input 
                          type="color" 
                          value={sidebarColor === 'transparent' ? '#ffffff' : sidebarColor}
                          onChange={(e) => updateDesign({ sidebarColor: e.target.value })}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                  </label>
              </div>
           </div>

           {/* Resize Handle */}
           <div
                className="absolute top-0 left-0 w-4 h-full cursor-col-resize flex items-center justify-center hover:bg-blue-500/10 transition-colors z-40 print:hidden group/handle -translate-x-1/2"
                onMouseDown={startResizing}
            >
                <div className="w-1 h-8 bg-slate-300 rounded-full group-hover/handle:bg-blue-400 transition-colors" />
            </div>

            <div style={gapStyle}>
                {certifications && certifications.length > 0 && (
                    <section>
                    <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblCertifications}</h2>
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
                    <section>
                    <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblLanguages}</h2>
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
                <section>
                    <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblSkills}</h2>
                    <p className="leading-relaxed text-justify">
                    {skills.length > 0 ? skills.join(', ') + '.' : <span className="italic text-gray-500">{t.noSkills}</span>}
                    </p>
                </section>

                {/* References */}
                {(referencesAvailableOnRequest || (references && references.length > 0)) && (
                    <section>
                    <h2 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblReferences}</h2>
                    
                    {referencesAvailableOnRequest ? (
                        <p className="italic">{t.availableOnRequest}.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default AcademicAPA;
