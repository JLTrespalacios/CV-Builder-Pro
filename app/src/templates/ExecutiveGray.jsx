import React, { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import EditableText from '../components/ui/EditableText';
import { TRANSLATIONS } from '../constants/translations';
import { formatDateRange } from '../utils/formatters';
import { Palette, GripVertical } from 'lucide-react';

const ExecutiveGray = ({ data, color }) => {
  const { language, updatePersonal, design, themeColor, updateDesign } = useCVStore();
  const t = TRANSLATIONS[language];
  const { personal, skills, experience, education, references, projects, hardSkills, softSkills, certifications, languages, referencesAvailableOnRequest } = data;
  const accentColor = themeColor || color || '#374151';
  const { sidebarWidth = 33, sidebarColor = '#f3f4f6' } = design || {};

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

  const handlePersonalUpdate = (field, value) => {
    updatePersonal({ [field]: value });
  };

  const rootStyle = {
    fontSize: `${design?.fontSize || 16}px`,
    fontFamily: design?.fontFamily || 'Inter',
    color: design?.fontColor || '#1f2937',
    lineHeight: design?.lineHeight || 1.5
  };

  const paddingTopStyle = {
    paddingTop: `${design?.marginTop || 0}px`
  };
  
  const gapStyle = {
    gap: `${design?.sectionGap || 28}px`,
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontFamily: design?.titleFont || design?.fontFamily || 'Inter'
  };

  return (
    <div 
        ref={containerRef}
        className="w-full h-full bg-white text-gray-800 font-sans grid min-h-full" 
        style={{
            ...rootStyle,
            gridTemplateColumns: `${sidebarWidth}% 1fr`
        }}
    >
      
      {/* Sidebar */}
      <div 
        className="relative group/sidebar border-r border-gray-200 flex flex-col" 
        style={{ 
            ...gapStyle, 
            ...paddingTopStyle,
            backgroundColor: sidebarColor
        }}
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

        {/* Resize Handle */}
        <div
            className="absolute top-0 right-0 w-4 h-full cursor-col-resize flex items-center justify-center hover:bg-blue-500/10 transition-colors z-40 print:hidden group/handle translate-x-1/2"
            onMouseDown={startResizing}
        >
            <div className="w-1 h-8 bg-slate-300 rounded-full group-hover/handle:bg-blue-400 transition-colors flex items-center justify-center">
                <GripVertical size={12} className="text-slate-600 opacity-0 group-hover/handle:opacity-100 group-hover/handle:text-white" />
            </div>
        </div>
        
        {/* Photo & Contact */}
        <div className="text-center break-inside-avoid">
           {personal.showPhoto && (
            <div className="w-40 h-40 mx-auto mb-6 rounded shadow-lg overflow-hidden flex items-center justify-center bg-gray-200 grayscale">
               {personal.photo ? (
                 <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
               ) : (
                 <span className="text-4xl font-bold text-gray-500">{personal.name ? personal.name.charAt(0) : 'U'}</span>
               )}
            </div>
          )}
          
          <div className="text-left space-y-3 text-sm text-gray-600 mt-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 w-16">{t.lblEmail}</span>
              <div className="flex-1 overflow-hidden">
                <EditableText value={personal.email} onChange={(val) => handlePersonalUpdate('email', val)} placeholder="Email" className="whitespace-nowrap overflow-hidden text-ellipsis" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 w-16">{t.lblPhone}</span>
              <div className="flex-1 overflow-hidden">
                <EditableText value={personal.phone} onChange={(val) => handlePersonalUpdate('phone', val)} placeholder="Phone" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 w-16">{t.lblLocation}</span>
              <div className="flex-1 overflow-hidden">
                <EditableText value={personal.location} onChange={(val) => handlePersonalUpdate('location', val)} placeholder="Location" />
              </div>
            </div>
            {personal.linkedin && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-16">LinkedIn</span>
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                  {personal.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-16">GitHub</span>
                <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                  {personal.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-16">Web</span>
                <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="truncate text-xs hover:underline text-blue-600">
                  {personal.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="uppercase tracking-widest font-bold text-gray-900 border-b-2 pb-2 mb-4" style={{ borderColor: accentColor, ...titleStyle }}>
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
            <h3 className="uppercase tracking-widest font-bold text-gray-900 border-b-2 pb-2 mb-4" style={{ borderColor: accentColor, ...titleStyle }}>
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
          <h3 className="uppercase tracking-widest font-bold text-gray-900 border-b-2 pb-2 mb-4" style={{ borderColor: accentColor, ...titleStyle }}>
            {t.lblSkills}
          </h3>
          
          {hardSkills && hardSkills.length > 0 ? (
            <div className="space-y-4">
              {hardSkills.map((cat, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">{cat.category}</h4>
                  <ul className="space-y-1">
                    {(cat.items || '').toString().split(',').map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
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
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
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
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
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
      <div className="p-8 flex flex-col" style={{ ...gapStyle, ...paddingTopStyle }}>
        {/* Header */}
        <header className="border-b-4 pb-6" style={{ borderColor: accentColor }}>
          <div className="text-4xl font-serif font-bold text-gray-900 mb-2 tracking-tight" style={titleStyle}>
            <EditableText 
              value={personal.name} 
              onChange={(val) => handlePersonalUpdate('name', val)} 
              placeholder="NAME"
              className="uppercase"
              style={{ color: design?.nameColor }}
            />
          </div>
          <div className="text-xl text-gray-500 font-light uppercase tracking-wider">
             <EditableText value={personal.role} onChange={(val) => handlePersonalUpdate('role', val)} placeholder="ROLE" />
          </div>
        </header>

        {/* Profile */}
        <section className="break-inside-avoid">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-3" style={{ color: accentColor, breakAfter: 'avoid' }}>
            {t.lblProfile}
          </h2>
          <div className="text-gray-600 leading-loose text-left text-lg font-light">
             <EditableText 
                value={personal.summary} 
                onChange={(val) => handlePersonalUpdate('summary', val)} 
                multiline={true}
            />
          </div>
        </section>

        {/* Experience */}
        <section className="flex-1">
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
          <section>
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
                    {ref.profession && <div className="text-sm font-medium text-gray-700">{ref.profession}</div>}
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
