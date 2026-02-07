import React, { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';
import { EditableText } from '../components/ui/EditableText';
import { Palette, GripVertical } from 'lucide-react';

const MinimalWhite = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor, updateDesign } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
  const accentColor = themeColor || color || '#111827'; // Default gray-900
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
      // Right sidebar logic: calculate width from right edge
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
    fontFamily: design?.fontFamily || 'Inter',
    color: design?.fontColor || '#1f2937',
    lineHeight: design?.lineHeight || 1.5
  };

  const gapStyle = {
      gap: `${design?.sectionGap || 28}px` // 40px default for MinimalWhite (gap-10)
  };

  return (
    <div 
      className="w-full min-h-full bg-white text-gray-800 font-sans p-8"
      style={containerStyle}
    >
      {/* Header */}
      <header className="border-b-2 pb-8 mb-8 flex justify-between items-start" style={{ borderColor: accentColor }}>
        <div>
          <div className="mb-2">
            <EditableText
              value={personal.name}
              onChange={(val) => handlePersonalUpdate('name', val)}
              className="text-5xl font-bold uppercase tracking-tight"
              style={{ color: design?.nameColor || accentColor }}
              placeholder="Nombre"
            />
          </div>
          <div className="mb-4">
             <EditableText
              value={personal.role}
              onChange={(val) => handlePersonalUpdate('role', val)}
              className="text-xl text-gray-500 font-light uppercase tracking-widest"
              placeholder="Cargo / Título"
            />
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium uppercase tracking-wider items-center">
            <EditableText
                value={personal.email}
                onChange={(val) => handlePersonalUpdate('email', val)}
                placeholder="Email"
                className="whitespace-nowrap"
            />
            <span>•</span>
            <EditableText
                value={personal.phone}
                onChange={(val) => handlePersonalUpdate('phone', val)}
                placeholder="Teléfono"
            />
            <span>•</span>
            <EditableText
                value={personal.location}
                onChange={(val) => handlePersonalUpdate('location', val)}
                placeholder="Ubicación"
            />
            {personal.documentNumber && <span>• {getDocumentTypeLabel(personal.documentType, t) || 'ID'}: {personal.documentNumber}</span>}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
            {personal.linkedin && <span>LinkedIn: <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">{personal.linkedin.replace(/^https?:\/\//, '')}</a></span>}
            {personal.github && <span>• GitHub: <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">{personal.github.replace(/^https?:\/\//, '')}</a></span>}
            {personal.website && <span>• {t.lblWebsite}: <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">{personal.website.replace(/^https?:\/\//, '')}</a></span>}
          </div>
        </div>
        {personal.showPhoto && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-50" style={{ borderColor: accentColor }}>
             {personal.photo ? (
               <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
             ) : (
               <span className="text-3xl font-bold text-gray-300">{personal.name ? personal.name.charAt(0) : 'U'}</span>
             )}
          </div>
        )}
      </header>

      <div 
        ref={containerRef}
        className="grid gap-12" 
        style={{
            gridTemplateColumns: `1fr ${sidebarWidth}%`
        }}
      >
        {/* Main Column */}
        <div>
          {/* Profile */}
          <section className="mb-10" style={{ marginBottom: gapStyle.gap }}>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblProfile}</h2>
            <div className="text-gray-700 leading-loose text-left text-lg whitespace-pre-line">
               <EditableText
                value={personal.summary}
                onChange={(val) => handlePersonalUpdate('summary', val)}
                multiline={true}
                placeholder={t.pendingSummary}
              />
            </div>
          </section>

          {/* Experience */}
          <section className="mb-10" style={{ marginBottom: gapStyle.gap }}>
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
            <section className="mb-10" style={{ marginBottom: gapStyle.gap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblProjects}</h2>
              <div className="space-y-8">
                  {projects.map((proj, i) => (
                    <div key={i} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-xl" style={{ color: accentColor }}>{proj.name}</h3>
                          {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{proj.link}</a>}
                      </div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">{proj.technologies}</p>
                      <p className="text-gray-700 leading-loose whitespace-pre-line">
                        {proj.description}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          )}
          
           {/* Education */}
           <section className="mb-10" style={{ marginBottom: gapStyle.gap }}>
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
            <section className="mb-10" style={{ marginBottom: gapStyle.gap }}>
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
                <div className="w-1 h-8 bg-slate-300 rounded-full group-hover/handle:bg-blue-400 transition-colors flex items-center justify-center">
                    <GripVertical size={12} className="text-slate-600 opacity-0 group-hover/handle:opacity-100 group-hover/handle:text-white" />
                </div>
            </div>

           {/* Hard Skills */}
           <section className="mb-12" style={{ marginBottom: gapStyle.gap }}>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblHardSkills || t.lblSkills}</h2>
            {hardSkills && hardSkills.length > 0 ? (
                <div className="space-y-6">
                  {hardSkills.map((cat, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">{cat.category}</h3>
                      <div className="flex flex-col gap-1">
                          {(cat.items || '').toString().split(',').map((item, i) => (
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
             <section className="mb-12" style={{ marginBottom: gapStyle.gap }}>
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
             <section className="mb-12" style={{ marginBottom: gapStyle.gap }}>
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
            <section className="mb-12" style={{ marginBottom: gapStyle.gap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor, breakAfter: 'avoid' }}>{t.lblReferences}</h2>
              
              {referencesAvailableOnRequest ? (
                <p className="text-sm text-gray-500 italic">{t.availableOnRequest}</p>
              ) : (
                <div className="space-y-6">
                  {references.map((ref, i) => (
                    <div key={i} className="break-inside-avoid">
                      <h3 className="font-bold text-gray-800" style={{ color: accentColor }}>{ref.name}</h3>
                      {ref.profession && <p className="text-sm font-medium text-gray-700">{ref.profession}</p>}
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
