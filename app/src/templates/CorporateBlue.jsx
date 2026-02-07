import React, { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange, getDocumentTypeLabel } from '../utils/formatters';
import { EditableText } from '../components/ui/EditableText';
import { GripVertical, Palette } from 'lucide-react';

const CorporateBlue = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor, updateDesign } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, languages, certifications, referencesAvailableOnRequest } = data;
  const accentColor = themeColor || color || '#1e3a8a'; // Default blue-900

  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const sidebarWidth = design?.sidebarWidth || 33.333;
  const sidebarColor = design?.sidebarColor || '#f1f5f9'; // slate-100 default

  const containerStyle = {
    paddingTop: `${design?.marginTop || 0}px`,
    fontSize: `${design?.fontSize || 16}px`,
    fontFamily: design?.fontFamily || 'Inter',
    color: design?.fontColor || '#1f2937',
    lineHeight: design?.lineHeight || 1.5
  };

  const gapStyle = {
      gap: `${design?.sectionGap || 24}px`
  };

  const titleStyle = {
    fontFamily: design?.titleFont || design?.fontFamily || 'Inter'
  };

  // Resize Logic
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
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
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

  return (
    <div 
      className="w-full h-full bg-white text-gray-800 font-sans min-h-full flex flex-col"
      style={containerStyle}
    >
      {/* Header */}
      <header className="text-white p-8 flex justify-between items-center" style={{ backgroundColor: accentColor }}>
        <div>
          <div className="mb-2" style={titleStyle}>
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
        {personal.showPhoto && (
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg flex items-center justify-center bg-white/10 backdrop-blur-sm">
            {personal.photo ? (
              <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
            ) : (
               <span className="text-4xl font-bold text-white">{personal.name ? personal.name.charAt(0) : 'U'}</span>
            )}
          </div>
        )}
      </header>

      <div className="flex flex-1 relative group/container" ref={containerRef}>
        {/* Left Column (Contact & Skills) */}
        <aside 
            className="p-6 border-r border-slate-200 flex flex-col relative group/sidebar transition-colors duration-300" 
            style={{ ...gapStyle, width: `${sidebarWidth}%`, backgroundColor: sidebarColor }}
        >
          {/* Color Picker */}
          <div className="absolute top-2 left-2 z-50 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 print:hidden">
            <div className="relative">
                <label className="cursor-pointer bg-white/90 hover:bg-white p-1.5 pr-3 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 transition-all hover:scale-105 group">
                    <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                        <Palette size={14} className="text-slate-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-600">Fondo</span>
                    <input 
                        type="color" 
                        value={sidebarColor}
                        onChange={(e) => updateDesign({ sidebarColor: e.target.value })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </label>
            </div>
          </div>

          <div className="break-inside-avoid">
            <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
              {t.lblContact}
            </h3>
            <div className="text-sm space-y-3 text-slate-600">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{t.lblEmail}</span>
                <EditableText
                    value={personal.email}
                    onChange={(val) => handlePersonalUpdate('email', val)}
                    placeholder="Email"
                    className="text-xs whitespace-nowrap overflow-hidden text-ellipsis"
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
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">{getDocumentTypeLabel(personal.documentType, t) || 'ID'}</span>
                    <span className="text-xs">{personal.documentNumber} {personal.expeditionPlace && <span>({personal.expeditionPlace})</span>}</span>
                  </div>
                )}
                 {personal.linkedin && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">LinkedIn</span>
                    <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                      {personal.linkedin.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {personal.github && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">GitHub</span>
                     <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                      {personal.github.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {personal.website && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">{t.lblWebsite}</span>
                     <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                      {personal.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
            </div>
          </div>

          {(hardSkills.length > 0 || skills.length > 0) && (
            <div className="mb-8 break-inside-avoid">
                <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
                {t.lblHardSkills || t.lblSkills}
                </h3>
                <div className="space-y-4">
                 {hardSkills.length > 0 ? (
                    hardSkills.map((cat, idx) => (
                        <div key={idx}>
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{cat.category}</h4>
                            <ul className="space-y-1">
                                {(cat.items || '').toString().split(',').map((item, i) => (
                                    <li key={i} className="text-slate-700 text-sm font-medium flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                 ) : (
                    <div className="flex flex-wrap gap-2">
                         {skills.map((skill, index) => (
                             <span key={index} className="bg-white border border-slate-300 px-2 py-1 rounded text-xs font-medium text-slate-700 shadow-sm">
                                {skill}
                             </span>
                         ))}
                    </div>
                 )}
                </div>
            </div>
          )}

          {softSkills && softSkills.length > 0 && (
             <div className="mb-8 break-inside-avoid">
                <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
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
                <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
                {t.lblLanguages}
                </h3>
                <div className="space-y-3">
                    {languages.map((lang, index) => (
                        <div key={index} className="flex justify-between items-end border-b border-slate-200 pb-1">
                            <span className="font-semibold text-slate-800 text-sm">{lang.language}</span>
                            <span className="text-xs text-slate-500 italic">{lang.level}</span>
                        </div>
                    ))}
                </div>
             </div>
          )}
        </aside>

        {/* Resize Handle */}
        <div 
            className="absolute top-0 bottom-0 w-4 -ml-2 z-20 cursor-col-resize flex items-center justify-center group/handle print:hidden hover:bg-blue-500/10 transition-colors"
            style={{ left: `${sidebarWidth}%` }}
            onMouseDown={startResizing}
            title="Arrastra para ajustar el ancho"
        >
            <div className="w-1 h-8 bg-slate-300 rounded-full shadow-sm group-hover/handle:bg-blue-500 group-hover/handle:scale-125 transition-all flex items-center justify-center">
                <GripVertical size={12} className="text-slate-600 opacity-0 group-hover/handle:opacity-100 group-hover/handle:text-white" />
            </div>
        </div>

        {/* Main Content */}
        <main className="p-8 flex-1 flex flex-col" style={gapStyle}>
          
          <div className="mb-8 break-inside-avoid">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4 border-b-2 pb-2 flex items-center gap-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
              {t.lblProfile}
            </h3>
             <div className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                <EditableText
                    value={personal.summary}
                    onChange={(val) => handlePersonalUpdate('summary', val)}
                    multiline={true}
                    placeholder={t.pendingSummary}
                />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
              {t.lblExperience}
            </h3>
            <div className="space-y-8">
              {experience.length === 0 ? (
                <p className="text-slate-400 italic">{t.noExperience}</p>
              ) : (
                experience.map((exp, i) => (
                  <div key={i} className="break-inside-avoid relative pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                      <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {formatDateRange(exp.duration, t, language)}
                      </span>
                    </div>
                    <div className="text-base font-medium mb-2" style={{ color: accentColor }}>{exp.company}</div>
                    <p className="text-slate-600 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {projects && projects.length > 0 && (
             <div className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
                  {t.lblProjects}
                </h3>
                <div className="space-y-6">
                    {projects.map((proj, i) => (
                        <div key={i} className="break-inside-avoid">
                             <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-lg text-slate-800">{proj.name}</h4>
                                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{proj.link}</a>}
                            </div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">{proj.technologies}</p>
                            <p className="text-slate-600 whitespace-pre-line">{proj.description}</p>
                        </div>
                    ))}
                </div>
             </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
              {t.lblEducation}
            </h3>
            <div className="space-y-6">
              {education.length === 0 ? (
                <p className="text-slate-400 italic">{t.noEducation}</p>
              ) : (
                education.map((edu, i) => (
                  <div key={i} className="break-inside-avoid flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">{edu.degree}</h4>
                        <div className="text-slate-600">{edu.school}</div>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {formatDateRange(edu.year, t, language)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

           {certifications && certifications.length > 0 && (
             <div className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
                  {t.lblCertifications}
                </h3>
                <div className="space-y-4">
                    {certifications.map((cert, i) => (
                        <div key={i} className="break-inside-avoid">
                            <h4 className="font-bold text-slate-800">{cert.name}</h4>
                             <div className="text-sm text-slate-600">
                                {cert.issuer} | {formatDateRange(cert.date, t, language)}
                             </div>
                        </div>
                    ))}
                </div>
             </div>
          )}

           {(referencesAvailableOnRequest || (references && references.length > 0)) && (
            <div className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor, breakAfter: 'avoid', ...titleStyle }}>
                  {t.lblReferences}
                </h3>
                {referencesAvailableOnRequest ? (
                     <p className="text-slate-600 italic">{t.availableOnRequest}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {references.map((ref, i) => (
                             <div key={i} className="break-inside-avoid p-4 bg-slate-50 rounded border border-slate-100">
                                <h4 className="font-bold text-slate-800">{ref.name}</h4>
                                {ref.profession && <p className="text-xs font-semibold text-slate-500 uppercase">{ref.profession}</p>}
                                <p className="text-sm text-slate-600 mt-1">{ref.role}</p>
                                <p className="text-xs text-slate-500">{ref.company}</p>
                                <div className="mt-2 text-xs space-y-0.5 text-slate-400">
                                    {ref.email && <div>{ref.email}</div>}
                                    {ref.phone && <div>{ref.phone}</div>}
                                </div>
                             </div>
                        ))}
                    </div>
                )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default CorporateBlue;
