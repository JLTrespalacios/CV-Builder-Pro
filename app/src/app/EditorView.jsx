import React, { useState, useRef, useEffect } from 'react';
import { useCVStore } from '../store/cvStore';
import { useUIStore } from '../store/uiStore';
import { TRANSLATIONS } from '../constants/translations';
import { User, Briefcase, GraduationCap, Code, Globe, Award, Users, FolderOpen, Layout, GripVertical, Eye, Edit3, ChevronLeft, ChevronRight } from 'lucide-react';

import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import BackgroundAmbience from '../components/layout/BackgroundAmbience';
import CVPreview from '../components/preview/CVPreview';
import SectionAccordion from '../components/ui/SectionAccordion';

import PersonalForm from '../components/editor/PersonalForm';
import EducationForm from '../components/editor/EducationForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import HardSkillsForm from '../components/editor/HardSkillsForm';
import SoftSkillsForm from '../components/editor/SoftSkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import LanguagesForm from '../components/editor/LanguagesForm';
import CertificationsForm from '../components/editor/CertificationsForm';
import ReferencesForm from '../components/editor/ReferencesForm';
import TemplateSelector from '../components/editor/TemplateSelector';

const EditorView = () => {
  const { isSidebarOpen, cvData, language } = useCVStore();
  const { appTheme, editorWidth, setEditorWidth, activeMobileTab, setActiveMobileTab } = useUIStore();
  const t = TRANSLATIONS[language];
  
  // Accordion state
  const [openSection, setOpenSection] = useState('personal');
  const [isEditorOpen, setIsEditorOpen] = useState(true);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handlePrint = () => window.print();

  // Resizing Logic
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
      const newWidthPercent = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Constraints
      const minWidthPx = 280;
      const minWidthPercent = (minWidthPx / containerRect.width) * 100;
      const maxPercent = 70;

      if (newWidthPercent >= minWidthPercent && newWidthPercent <= maxPercent) {
        setEditorWidth(newWidthPercent);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, setEditorWidth]);

  return (
    <div className="flex h-screen bg-[var(--bg-app)] text-[var(--text-main)] font-sans overflow-hidden transition-colors duration-300 relative selection:bg-indigo-500/30" data-theme={appTheme}>
      <div className="print:hidden hidden md:block">
        <BackgroundAmbience />
      </div>
      <div className="print:hidden">
        <Sidebar onPrint={handlePrint} />
      </div>
      
      {/* Main Content with Padding for Fixed Header */}
      <main className="flex-1 flex flex-col h-full transition-all duration-300 relative z-10 overflow-hidden pt-[72px] lg:pt-0">
         <div className="print:hidden">
            <Header onDownload={handlePrint} />
         </div>

         {/* Mobile Tab Toggle */}
         <div className="lg:hidden flex border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] sticky top-0 z-20 print:hidden">
            <button 
              onClick={() => setActiveMobileTab('editor')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative
                ${activeMobileTab === 'editor' ? 'text-indigo-400' : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'}
              `}
            >
              <Edit3 size={16} />
              Editor
              {activeMobileTab === 'editor' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_-2px_8px_rgba(99,102,241,0.5)]" />
              )}
            </button>
            <div className="w-px bg-[var(--border-subtle)] my-2 opacity-50" />
            <button 
              onClick={() => setActiveMobileTab('preview')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative
                ${activeMobileTab === 'preview' ? 'text-indigo-400' : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'}
              `}
            >
              <Eye size={16} />
              Vista Previa
              {activeMobileTab === 'preview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_-2px_8px_rgba(99,102,241,0.5)]" />
              )}
            </button>
         </div>

         <div ref={containerRef} className="flex-1 overflow-hidden relative flex flex-col lg:flex-row pt-0 print:pt-0">
            {/* Resizable Editor Section */}
      <div 
        className={`relative z-20 h-full border-r border-[var(--border-subtle)] bg-[var(--bg-panel)]/30 backdrop-blur-sm print:hidden overflow-hidden pt-0 lg:pt-[72px]
          ${isResizing ? 'transition-none' : 'transition-all duration-300 ease-in-out'}
          ${activeMobileTab === 'editor' ? 'block w-full' : 'hidden'} 
          lg:block lg:w-[var(--editor-dynamic-width)] lg:min-w-[var(--editor-min-width)]
          ${!isEditorOpen ? 'lg:border-none' : ''}`}
        style={{ 
          '--editor-dynamic-width': isEditorOpen ? `${editorWidth}%` : '0px',
          '--editor-min-width': isEditorOpen ? '280px' : '0px'
        }}
      >
        <div className={`h-full overflow-y-auto custom-scrollbar p-6 pb-40 lg:pb-40 ${!isEditorOpen && activeMobileTab !== 'editor' ? 'hidden' : ''}`}>
          <div className="max-w-3xl mx-auto space-y-6">
                 
                 {/* Header */}
                 <div className="mb-2">
                    <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2 tracking-tight">{t.editorTitle}</h1>
                    <p className="text-[var(--text-secondary)]">{t.editorSubtitle}</p>
                 </div>

                 {/* Templates & Design */}
                 <SectionAccordion 
                    title={t.templatesAndDesign} 
                    icon={Layout} 
                    isOpen={openSection === 'templates'} 
                    onToggle={() => toggleSection('templates')}
                 >
                    <TemplateSelector />
                 </SectionAccordion>

                 {/* Personal Info */}
                 <SectionAccordion 
                    title={t.personalInfo} 
                    icon={User} 
                    isOpen={openSection === 'personal'} 
                    onToggle={() => toggleSection('personal')}
                 >
                    <PersonalForm />
                 </SectionAccordion>

                 {/* Experience */}
                 <SectionAccordion 
                    title={t.experience} 
                    icon={Briefcase} 
                    isOpen={openSection === 'experience'} 
                    onToggle={() => toggleSection('experience')}
                 >
                    <ExperienceForm />
                 </SectionAccordion>

                 {/* Education */}
                 <SectionAccordion 
                    title={t.education} 
                    icon={GraduationCap} 
                    isOpen={openSection === 'education'} 
                    onToggle={() => toggleSection('education')}
                 >
                    <EducationForm />
                 </SectionAccordion>

                 {/* Skills */}
                 <SectionAccordion 
                    title={t.skills} 
                    icon={Code} 
                    isOpen={openSection === 'skills'} 
                    onToggle={() => toggleSection('skills')}
                 >
                    <div className="space-y-8">
                      <HardSkillsForm />
                      <div className="border-t border-[var(--border-subtle)] pt-6">
                        <SoftSkillsForm />
                      </div>
                    </div>
                 </SectionAccordion>

                  {/* Languages */}
                 <SectionAccordion 
                    title={t.languages} 
                    icon={Globe} 
                    isOpen={openSection === 'languages'} 
                    onToggle={() => toggleSection('languages')}
                 >
                    <LanguagesForm />
                 </SectionAccordion>

                 {/* Certifications */}
                 <SectionAccordion 
                    title={t.certifications} 
                    icon={Award} 
                    isOpen={openSection === 'certifications'} 
                    onToggle={() => toggleSection('certifications')}
                 >
                    <CertificationsForm />
                 </SectionAccordion>

                 {/* Projects */}
                 <SectionAccordion 
                    title={t.projects} 
                    icon={FolderOpen} 
                    isOpen={openSection === 'projects'} 
                    onToggle={() => toggleSection('projects')}
                 >
                    <ProjectsForm />
                 </SectionAccordion>

                 {/* References */}
                 <SectionAccordion 
                    title={t.references} 
                    icon={Users} 
                    isOpen={openSection === 'references'} 
                    onToggle={() => toggleSection('references')}
                 >
                    <ReferencesForm />
                 </SectionAccordion>
               </div>
               </div>
            </div>

            {/* Resizer Handle */}
            <div
              className={`hidden lg:flex w-4 -ml-2 z-50 cursor-col-resize items-center justify-center transition-colors group relative
                 ${isResizing ? 'bg-indigo-500/10' : 'hover:bg-indigo-500/10'}
                 ${!isEditorOpen ? 'pointer-events-none opacity-0' : ''}
              `}
              onMouseDown={isEditorOpen ? startResizing : undefined}
            >
               <div className={`w-0.5 h-8 rounded-full transition-all duration-300 ${isResizing ? 'bg-indigo-500 h-12 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-[var(--border-subtle)] group-hover:bg-indigo-400'}`}></div>
            </div>

            {/* Preview Section */}
            <div 
               className={`h-full bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden relative flex flex-col z-0 pt-0 lg:pt-[72px]
                  ${activeMobileTab === 'preview' ? 'block w-full' : 'hidden'} 
                  lg:block lg:flex-1
               `}
            >
               <div className="flex-1 overflow-auto custom-scrollbar p-4 pb-40 lg:p-8 lg:pb-40 print:overflow-visible print:p-0">
                  <CVPreview />
               </div>
            </div>

            {/* Global Toggle Button - Moved outside to prevent z-index/overflow issues */}
            <button 
               onClick={() => setIsEditorOpen(!isEditorOpen)}
               className={`hidden lg:flex absolute top-24 z-[60] items-center justify-center w-6 h-6 rounded-full shadow-lg border border-white/10 transition-all duration-300 hover:scale-110
                  bg-indigo-600 text-white
                  ${isEditorOpen ? '-ml-3' : 'ml-0'}
               `}
               style={{ 
                  left: isEditorOpen ? `${editorWidth}%` : '0%',
                  transform: isEditorOpen ? 'none' : 'translateX(50%)' 
               }}
               title={isEditorOpen ? "Ocultar Editor" : "Mostrar Editor"}
            >
               {isEditorOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
         </div>
      </main>
    </div>
  );
};

export default EditorView;
