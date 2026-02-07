import React, { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import EditableText from '../components/ui/EditableText';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange } from '../utils/formatters';
import { Palette } from 'lucide-react';

const IvyLeague = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor, updateDesign } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
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
    fontSize: `${design?.fontSize || 14}px`,
    fontFamily: design?.fontFamily || 'Merriweather, serif',
    color: design?.fontColor || '#000000',
    lineHeight: design?.lineHeight || 1.5
  };

  const gapStyle = {
    gap: `${design?.sectionGap || 24}px`,
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontFamily: design?.titleFont || 'Merriweather, serif'
  };

  return (
    <div 
      className="w-full h-full bg-white text-black font-serif p-8 min-h-full text-sm leading-snug"
      style={containerStyle}
    >
      {/* Header */}
      <header className="text-center mb-6 border-b pb-4" style={{ borderColor: accentColor, ...titleStyle }}>
        {personal.showPhoto && (
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-50" style={{ borderColor: accentColor }}>
            {personal.photo ? (
              <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-serif font-bold text-gray-400">{personal.name ? personal.name.charAt(0) : 'U'}</span>
            )}
          </div>
        )}
        <div className="text-2xl font-bold uppercase tracking-wide mb-2 flex justify-center">
          <EditableText
            value={personal.name}
            onChange={(val) => handlePersonalUpdate('name', val)}
            placeholder="YOUR NAME"
          />
        </div>
        <div className="flex justify-center gap-3 text-sm flex-wrap items-center">
          <EditableText value={personal.location} onChange={(val) => handlePersonalUpdate('location', val)} placeholder="Location" />
          <span>•</span>
          <EditableText value={personal.phone} onChange={(val) => handlePersonalUpdate('phone', val)} placeholder="Phone" />
          <span>•</span>
          <EditableText value={personal.email} onChange={(val) => handlePersonalUpdate('email', val)} placeholder="Email" className="whitespace-nowrap" />
          {personal.linkedin && <span>• <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personal.linkedin.replace(/^https?:\/\//, '')}</a></span>}
          {personal.github && <span>• <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personal.github.replace(/^https?:\/\//, '')}</a></span>}
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

        {/* Profile (Summary) moved to top of Main */}
        {personal.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblProfile}</h2>
              <div className="text-left leading-loose">
                <EditableText
                  value={personal.summary}
                  onChange={(val) => handlePersonalUpdate('summary', val)}
                  multiline={true}
                  className="inline"
                />
              </div>
            </section>
        )}

        {/* Education - Often comes first in Ivy League style if recent grad, but we'll stick to standard order or put it top if requested. We'll follow standard CV flow here but Education is high priority. */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblEducation}</h2>
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
        <section>
          <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblExperience}</h2>
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
          <section>
            <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblProjects}</h2>
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
                  <p className="text-left text-gray-800">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        </div>

        {/* Sidebar Content */}
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
                {/* Skills & Additional Info */}
                <section className="break-inside-avoid">
                    <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>{t.lblSkills}</h2>
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
                    </div>
                </section>

                {certifications && certifications.length > 0 && (
                    <section>
                    <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblCertifications}</h2>
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
                    <section>
                    <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ borderColor: accentColor, breakAfter: 'avoid' }}>{t.lblReferences}</h2>
                    
                    {referencesAvailableOnRequest ? (
                        <p className="italic text-gray-600">{t.availableOnRequest}.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                        {references.map((ref, i) => (
                            <div key={i} className="break-inside-avoid">
                            <div className="font-bold">{ref.name}</div>
                            {ref.profession && <div className="text-xs font-semibold">{ref.profession}</div>}
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
        </div>
      </div>
    </div>
  );
};

export default IvyLeague;
