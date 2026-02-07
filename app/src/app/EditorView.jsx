import React, { useState } from 'react';
import { useCVStore } from '../store/cvStore';
import { useUIStore } from '../store/uiStore';
import { TRANSLATIONS } from '../constants/translations';
import { User, Briefcase, GraduationCap, Code, Globe, Award, Users, FolderOpen, Layout } from 'lucide-react';

import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import BackgroundAmbience from '../components/layout/BackgroundAmbience';
import CVPreview from '../components/preview/CVPreview';
import SectionAccordion from '../components/ui/SectionAccordion';

import PersonalForm from '../components/editor/PersonalForm';
import EducationForm from '../components/editor/EducationForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import LanguagesForm from '../components/editor/LanguagesForm';
import CertificationsForm from '../components/editor/CertificationsForm';
import ReferencesForm from '../components/editor/ReferencesForm';
import TemplateSelector from '../components/editor/TemplateSelector';

const EditorView = () => {
  const { isSidebarOpen, cvData, language } = useCVStore();
  const { appTheme } = useUIStore();
  const t = TRANSLATIONS[language];
  
  // Accordion state
  const [openSection, setOpenSection] = useState('personal');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex h-screen bg-[var(--bg-app)] text-[var(--text-main)] font-sans overflow-hidden transition-colors duration-300 relative selection:bg-indigo-500/30" data-theme={appTheme}>
      <BackgroundAmbience />
      <Sidebar onPrint={handlePrint} />
      
      <main className="flex-1 flex flex-col h-full transition-all duration-300 relative z-10">
         <Header />
         
         <div className="flex-1 overflow-hidden relative flex flex-col lg:flex-row pt-16">
            {/* Editor Section */}
            <div className={`h-full overflow-y-auto custom-scrollbar p-6 pb-24 lg:pb-6 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)]/30 backdrop-blur-sm transition-all duration-300 ${isSidebarOpen ? 'w-full lg:w-1/2' : 'w-0 p-0 overflow-hidden border-none'}`}>
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">Editor de CV</h1>
                        <p className="text-[var(--text-secondary)]">Completa tu información y observa los cambios en tiempo real.</p>
                    </div>

                    <SectionAccordion 
                        title={t.personalInfo} 
                        icon={User} 
                        isOpen={openSection === 'personal'} 
                        onToggle={() => toggleSection('personal')}
                        isComplete={!!cvData.personal.name}
                    >
                        <PersonalForm />
                    </SectionAccordion>

                    <SectionAccordion 
                        title={t.experience} 
                        icon={Briefcase} 
                        isOpen={openSection === 'experience'} 
                        onToggle={() => toggleSection('experience')}
                        isComplete={cvData.experience.length > 0}
                    >
                        <ExperienceForm />
                    </SectionAccordion>

                    <SectionAccordion 
                        title={t.education} 
                        icon={GraduationCap} 
                        isOpen={openSection === 'education'} 
                        onToggle={() => toggleSection('education')}
                        isComplete={cvData.education.length > 0}
                    >
                        <EducationForm />
                    </SectionAccordion>

                    <SectionAccordion 
                        title={t.skills} 
                        icon={Code} 
                        isOpen={openSection === 'skills'} 
                        onToggle={() => toggleSection('skills')}
                        isComplete={cvData.skills.length > 0}
                    >
                        <SkillsForm />
                    </SectionAccordion>

                    <SectionAccordion 
                        title={t.projects} 
                        icon={FolderOpen} 
                        isOpen={openSection === 'projects'} 
                        onToggle={() => toggleSection('projects')}
                        isComplete={cvData.projects && cvData.projects.length > 0}
                    >
                        <ProjectsForm />
                    </SectionAccordion>

                    <SectionAccordion 
                        title={t.languages} 
                        icon={Globe} 
                        isOpen={openSection === 'languages'} 
                        onToggle={() => toggleSection('languages')}
                        isComplete={cvData.languages.length > 0}
                    >
                        <LanguagesForm />
                    </SectionAccordion>
                    
                    <SectionAccordion 
                        title="Certificaciones" 
                        icon={Award} 
                        isOpen={openSection === 'certifications'} 
                        onToggle={() => toggleSection('certifications')}
                        isComplete={cvData.certifications && cvData.certifications.length > 0}
                    >
                        <CertificationsForm />
                    </SectionAccordion>

                    <SectionAccordion 
                        title="Referencias" 
                        icon={Users} 
                        isOpen={openSection === 'references'} 
                        onToggle={() => toggleSection('references')}
                        isComplete={cvData.references && cvData.references.length > 0}
                    >
                        <ReferencesForm />
                    </SectionAccordion>

                     <SectionAccordion 
                        title="Personalización" 
                        icon={Layout} 
                        isOpen={openSection === 'design'} 
                        onToggle={() => toggleSection('design')}
                    >
                        <TemplateSelector />
                    </SectionAccordion>
                </div>
            </div>

             {/* Preview Section */}
            <div className={`hidden lg:block h-full bg-[var(--bg-app)]/50 relative overflow-hidden flex items-center justify-center p-8 transition-all duration-300 ${isSidebarOpen ? 'w-1/2' : 'w-full'}`}>
                <div className="h-full w-full max-w-[21cm] shadow-2xl rounded-sm overflow-hidden bg-white transform transition-transform duration-300 origin-top">
                   <CVPreview />
                </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default EditorView;