import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCVStore } from '../store/cvStore';
import { useUIStore } from '../store/uiStore';
import { TRANSLATIONS } from '../constants/translations';
import { User, Briefcase, GraduationCap, FolderGit2, Cpu, HeartHandshake, Languages, Award, Users, CheckCircle2, Eye, EyeOff, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import SectionAccordion from '../components/ui/SectionAccordion';
import ToastContainer from '../components/ui/ToastContainer';
import PersonalForm from '../components/editor/PersonalForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import HardSkillsForm from '../components/editor/HardSkillsForm';
import SoftSkillsForm from '../components/editor/SoftSkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import CertificationsForm from '../components/editor/CertificationsForm';
import LanguagesForm from '../components/editor/LanguagesForm';
import ReferencesForm from '../components/editor/ReferencesForm';
import ProTipsPanel from '../components/editor/ProTipsPanel';
import TemplateSelector from '../components/editor/TemplateSelector';
import SavedCVsPanel from '../components/editor/SavedCVsPanel';
import AIAssistantPanel from '../components/editor/AIAssistantPanel';
import CVPreview from '../components/preview/CVPreview';

function App() {
  const componentRef = useRef();
  const { activeTab, isSidebarOpen, toggleSidebar, language, cvData } = useCVStore();
  const { appTheme } = useUIStore();
  const t = TRANSLATIONS[language];
  const [activeSection, setActiveSection] = useState('personal');

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Mi_CV_Profesional',
  });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const hasData = (section) => {
    if (section === 'personal') return !!cvData.personal.firstName;
    if (section === 'experience') return cvData.experience.length > 0;
    if (section === 'education') return cvData.education.length > 0;
    if (section === 'projects') return cvData.projects.length > 0;
    if (section === 'hardSkills') return cvData.hardSkills.length > 0;
    if (section === 'softSkills') return cvData.softSkills.length > 0;
    if (section === 'languages') return cvData.languages.length > 0;
    if (section === 'certifications') return cvData.certifications.length > 0;
    if (section === 'references') return cvData.references.length > 0;
    return false;
  };

  // Stepper Visual Component
  const Stepper = () => {
    const steps = [
      { id: 'personal', label: 'Info' },
      { id: 'experience', label: 'Exp' },
      { id: 'education', label: 'Edu' },
      { id: 'hardSkills', label: 'Skills' },
      { id: 'projects', label: 'Proy' }
    ];

    return (
      <div className="flex items-center justify-between mb-8 px-2 relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10"></div>
        {steps.map((step) => {
          const completed = hasData(step.id);
          const active = activeSection === step.id;
          return (
            <div key={step.id} className="flex flex-col items-center gap-1 bg-[var(--bg-panel)] px-2 transition-colors">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  completed ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 
                  active ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-[var(--bg-panel)] border-[var(--border-subtle)] text-slate-300'
                }`}
              >
                {completed ? <CheckCircle2 size={14} /> : <div className={`w-2 h-2 rounded-full ${active ? 'bg-blue-500' : 'bg-slate-300'}`} />}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[var(--bg-app)] text-[var(--text-main)] font-sans overflow-hidden transition-colors duration-300" data-theme={appTheme}>
      <Sidebar onPrint={handlePrint} />
      <ToastContainer />
      
      <div className="flex-1 flex flex-col h-full relative z-10">
        <Header onDownload={handlePrint} />
        
        <main className="flex-1 flex overflow-hidden">
          {/* Editor Section */}
          <section 
            className={`bg-[var(--bg-panel)] border-r border-[var(--border-subtle)] overflow-y-auto transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30
              ${isSidebarOpen ? 'absolute inset-0 w-full md:relative md:w-[500px] md:inset-auto' : 'w-0 p-0 overflow-hidden border-none'}
            `}
          >
            {activeTab === 'editor' && (
              <div className="pb-20 min-w-[350px]">
                <div className="sticky top-0 bg-[var(--bg-panel)]/95 backdrop-blur-sm z-20 px-8 py-6 border-b border-[var(--border-subtle)] mb-6 transition-colors">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-[var(--text-main)] tracking-tight">{t.contentEditor}</h2>
                        <button 
                          onClick={toggleSidebar}
                          className="hidden md:flex p-1.5 text-[var(--text-secondary)] hover:text-blue-600 hover:bg-[var(--bg-muted)] rounded-lg transition-colors"
                          title="Ocultar panel lateral"
                        >
                          <PanelLeftClose size={18} />
                        </button>
                     </div>
                     <div className="flex items-center gap-3">
                       <button 
                         onClick={toggleSidebar}
                         className="md:hidden p-2 text-[var(--text-secondary)] hover:text-blue-600 bg-[var(--bg-app)] rounded-full"
                         aria-label="Ver vista previa"
                         title="Ver vista previa"
                       >
                         <Eye size={18} />
                       </button>
                       <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Paso a paso</span>
                     </div>
                   </div>
                   <Stepper />
                </div>
                
                <div className="px-8 space-y-4">
                  <SectionAccordion 
                    title={t.personalInfo || "Información Personal"} 
                    icon={User} 
                    isOpen={activeSection === 'personal'} 
                    onToggle={() => toggleSection('personal')}
                    isComplete={hasData('personal')}
                  >
                    <PersonalForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.experience || "Experiencia"} 
                    icon={Briefcase} 
                    isOpen={activeSection === 'experience'} 
                    onToggle={() => toggleSection('experience')}
                    isComplete={hasData('experience')}
                  >
                    <ExperienceForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.education || "Educación"} 
                    icon={GraduationCap} 
                    isOpen={activeSection === 'education'} 
                    onToggle={() => toggleSection('education')}
                    isComplete={hasData('education')}
                  >
                    <EducationForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.hardSkills || "Habilidades Técnicas"} 
                    icon={Cpu} 
                    isOpen={activeSection === 'hardSkills'} 
                    onToggle={() => toggleSection('hardSkills')}
                    isComplete={hasData('hardSkills')}
                  >
                    <HardSkillsForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.softSkills || "Habilidades Blandas"} 
                    icon={HeartHandshake} 
                    isOpen={activeSection === 'softSkills'} 
                    onToggle={() => toggleSection('softSkills')}
                    isComplete={hasData('softSkills')}
                  >
                    <SoftSkillsForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.projects || "Proyectos"} 
                    icon={FolderGit2} 
                    isOpen={activeSection === 'projects'} 
                    onToggle={() => toggleSection('projects')}
                    isComplete={hasData('projects')}
                  >
                    <ProjectsForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.languages || "Idiomas"} 
                    icon={Languages} 
                    isOpen={activeSection === 'languages'} 
                    onToggle={() => toggleSection('languages')}
                    isComplete={hasData('languages')}
                  >
                    <LanguagesForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.certifications || "Certificaciones"} 
                    icon={Award} 
                    isOpen={activeSection === 'certifications'} 
                    onToggle={() => toggleSection('certifications')}
                    isComplete={hasData('certifications')}
                  >
                    <CertificationsForm />
                  </SectionAccordion>

                  <SectionAccordion 
                    title={t.references || "Referencias"} 
                    icon={Users} 
                    isOpen={activeSection === 'references'} 
                    onToggle={() => toggleSection('references')}
                    isComplete={hasData('references')}
                  >
                    <ReferencesForm />
                  </SectionAccordion>

                  <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                    <ProTipsPanel />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="p-8 pb-20 min-w-[350px]">
                <div className="flex items-center gap-3 mb-8">
                   <h2 className="text-xl font-bold text-[var(--text-main)] tracking-tight">{t.templates}</h2>
                </div>
                <TemplateSelector />
              </div>
            )}

            {activeTab === 'saved' && (
              <SavedCVsPanel />
            )}

            {activeTab === 'ai-assistant' && (
              <AIAssistantPanel />
            )}
          </section>

          {/* Preview Section */}
          <section className="flex-1 bg-[var(--bg-muted)] overflow-y-auto overflow-x-hidden relative flex flex-col items-center transition-colors duration-300" aria-label="Vista Previa del CV">
             <div className="w-full max-w-5xl p-8 pb-20 flex justify-center min-h-full">
                <div className="shadow-2xl print:shadow-none transition-transform duration-300 ease-out origin-top scale-[0.85] lg:scale-95 xl:scale-100">
                  <CVPreview ref={componentRef} />
                </div>
             </div>
             
             {/* Bottom gradient fade */}
             <div className="fixed bottom-0 left-[500px] right-0 h-12 bg-gradient-to-t from-[var(--bg-muted)] to-transparent pointer-events-none z-10 transition-colors" />
          </section>

        </main>

        <footer className="py-2 text-center text-[10px] text-[var(--text-secondary)] border-t border-[var(--border-subtle)] bg-[var(--bg-panel)] z-20 select-none">
          © 2024 Leonardo Trespalacios · Building scalable software & digital solutions
        </footer>
      </div>
    </div>
  );
}

export default App;
