import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCVStore = create(
  persist(
    (set) => ({
      cvData: {
        personal: {
          name: "",
          role: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
          github: "",
          summary: "",
          photo: null,
          showPhoto: true,
          documentType: "",
          documentNumber: "",
          expeditionPlace: "",
          professionalLevel: ""
        },
        skills: [],
        hardSkills: [],
        softSkills: [],
        experience: [],
        projects: [],
        education: [],
        certifications: [],
        languages: [],
        references: [],
        referencesAvailableOnRequest: false
      },
      selectedTemplate: 'ModernDark',
      themeColor: '#2563eb', // Default blue-600
      language: 'es',
      activeTab: 'editor', // 'editor', 'templates'
      isSidebarOpen: true,
      
      setLanguage: (lang) => set({ language: lang }),
      
      updatePersonal: (data) => set((state) => ({
        cvData: { ...state.cvData, personal: { ...state.cvData.personal, ...data } }
      })),
      
      setTemplate: (templateName) => set({ selectedTemplate: templateName }),
      setThemeColor: (color) => set({ themeColor: color }),
      setActiveTab: (tab) => set({ activeTab: tab, isSidebarOpen: true }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      addSkill: (skill) => set((state) => ({
        cvData: { ...state.cvData, skills: [...state.cvData.skills, skill] }
      })),

      removeSkill: (skill) => set((state) => ({
        cvData: { ...state.cvData, skills: state.cvData.skills.filter(s => s !== skill) }
      })),

      // Experience Actions
      addExperience: (experience) => set((state) => ({
        cvData: { ...state.cvData, experience: [...state.cvData.experience, experience] }
      })),
      removeExperience: (index) => set((state) => ({
        cvData: { ...state.cvData, experience: state.cvData.experience.filter((_, i) => i !== index) }
      })),
      updateExperience: (index, experience) => set((state) => {
        const newExperience = [...state.cvData.experience];
        newExperience[index] = experience;
        return { cvData: { ...state.cvData, experience: newExperience } };
      }),

      // Education Actions
      addEducation: (education) => set((state) => ({
        cvData: { ...state.cvData, education: [...state.cvData.education, education] }
      })),
      removeEducation: (index) => set((state) => ({
        cvData: { ...state.cvData, education: state.cvData.education.filter((_, i) => i !== index) }
      })),
      updateEducation: (index, education) => set((state) => {
        const newEducation = [...state.cvData.education];
        newEducation[index] = education;
        return { cvData: { ...state.cvData, education: newEducation } };
      }),

      // References Actions
      toggleReferencesOnRequest: () => set((state) => ({
        cvData: { ...state.cvData, referencesAvailableOnRequest: !state.cvData.referencesAvailableOnRequest }
      })),
      addReference: (reference) => set((state) => ({
        cvData: { ...state.cvData, references: [...state.cvData.references, reference] }
      })),
      removeReference: (index) => set((state) => ({
        cvData: { ...state.cvData, references: state.cvData.references.filter((_, i) => i !== index) }
      })),
      updateReference: (index, reference) => set((state) => {
        const newReferences = [...state.cvData.references];
        newReferences[index] = reference;
        return { cvData: { ...state.cvData, references: newReferences } };
      }),

      // Projects Actions
      addProject: (project) => set((state) => ({
        cvData: { ...state.cvData, projects: [...state.cvData.projects, project] }
      })),
      removeProject: (index) => set((state) => ({
        cvData: { ...state.cvData, projects: state.cvData.projects.filter((_, i) => i !== index) }
      })),
      updateProject: (index, project) => set((state) => {
        const newProjects = [...state.cvData.projects];
        newProjects[index] = project;
        return { cvData: { ...state.cvData, projects: newProjects } };
      }),

      // Certifications Actions
      addCertification: (cert) => set((state) => ({
        cvData: { ...state.cvData, certifications: [...state.cvData.certifications, cert] }
      })),
      removeCertification: (index) => set((state) => ({
        cvData: { ...state.cvData, certifications: state.cvData.certifications.filter((_, i) => i !== index) }
      })),
      updateCertification: (index, cert) => set((state) => {
        const newCerts = [...state.cvData.certifications];
        newCerts[index] = cert;
        return { cvData: { ...state.cvData, certifications: newCerts } };
      }),

      // Languages Actions
      addLanguage: (lang) => set((state) => ({
        cvData: { ...state.cvData, languages: [...state.cvData.languages, lang] }
      })),
      removeLanguage: (index) => set((state) => ({
        cvData: { ...state.cvData, languages: state.cvData.languages.filter((_, i) => i !== index) }
      })),
      updateLanguage: (index, lang) => set((state) => {
        const newLangs = [...state.cvData.languages];
        newLangs[index] = lang;
        return { cvData: { ...state.cvData, languages: newLangs } };
      }),

      // Hard Skills Actions (Categories)
      addHardSkill: (category) => set((state) => ({
        cvData: { ...state.cvData, hardSkills: [...state.cvData.hardSkills, category] }
      })),
      removeHardSkill: (index) => set((state) => ({
        cvData: { ...state.cvData, hardSkills: state.cvData.hardSkills.filter((_, i) => i !== index) }
      })),
      updateHardSkill: (index, category) => set((state) => {
        const newSkills = [...state.cvData.hardSkills];
        newSkills[index] = category;
        return { cvData: { ...state.cvData, hardSkills: newSkills } };
      }),

      // Soft Skills Actions
      addSoftSkill: (skill) => set((state) => ({
        cvData: { ...state.cvData, softSkills: [...state.cvData.softSkills, skill] }
      })),
      removeSoftSkill: (skill) => set((state) => ({
        cvData: { ...state.cvData, softSkills: state.cvData.softSkills.filter(s => s !== skill) }
      })),

      // Data Management Actions
      loadCVData: (data) => set((state) => ({
        cvData: { ...state.cvData, ...data }
      })),
      resetCVData: () => set((state) => ({
        cvData: {
            personal: {
              name: "", role: "", email: "", phone: "", location: "",
              linkedin: "", website: "", github: "", summary: "",
              photo: null, showPhoto: true,
              documentType: "", documentNumber: "", expeditionPlace: "", professionalLevel: ""
            },
            skills: [], hardSkills: [], softSkills: [],
            experience: [], projects: [], education: [],
            certifications: [], languages: [], references: [],
            referencesAvailableOnRequest: false
        }
      }))
    }),
    {
      name: 'cv-storage', // unique name for localStorage
      partialize: (state) => ({ 
        cvData: state.cvData, 
        selectedTemplate: state.selectedTemplate,
        themeColor: state.themeColor,
        language: state.language
      }), // Persist important data only, skip UI state like isSidebarOpen if desired, but here we persist main config.
    }
  )
);
