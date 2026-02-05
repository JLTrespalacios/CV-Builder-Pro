import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper to sort items by date (descending, with "Presente" first)
const sortItemsByDate = (items, dateField) => {
  return [...items].sort((a, b) => {
    const parseDateStr = (dateVal) => {
       // Default values
       let start = -8640000000000000;
       let end = -8640000000000000;

       if (!dateVal) return { start, end };
       
       // Legacy object support
       if (typeof dateVal === 'object') {
          end = dateVal.isPresent ? Infinity : new Date(dateVal.end || 0).getTime();
          start = new Date(dateVal.start || 0).getTime();
          return { start, end };
       }

       const str = String(dateVal).toLowerCase();
       
       // Check for "Presente" keywords
       const isPresent = str.includes('present') || str.includes('actual') || str.includes('now') || str.includes('curso');

       if (str.includes(' - ')) {
          const parts = str.split(' - ');
          
          // Parse Start Date
          const startStr = parts[0];
          const dStart = new Date(startStr);
          if (!isNaN(dStart.getTime())) {
             start = dStart.getTime();
          } else {
             const startMatch = startStr.match(/\d{4}/);
             if (startMatch) start = new Date(startMatch[0]).getTime();
          }

          // Parse End Date
          if (isPresent) {
             end = Infinity;
          } else if (parts[1]) {
             const endStr = parts[1];
             const dEnd = new Date(endStr);
             if (!isNaN(dEnd.getTime())) {
                end = dEnd.getTime();
             } else {
                const endMatch = endStr.match(/\d{4}/);
                if (endMatch) end = new Date(endMatch[0]).getTime();
             }
          }
       } else {
          // Single date string
          if (isPresent) {
             end = Infinity;
             start = Infinity; 
          } else {
             const d = new Date(str);
             if (!isNaN(d.getTime())) {
                start = d.getTime();
                end = d.getTime();
             } else {
                const match = str.match(/\d{4}/);
                if (match) {
                   start = new Date(match[0]).getTime();
                   end = new Date(match[0]).getTime();
                }
             }
          }
       }
       return { start, end };
    };

    const datesA = parseDateStr(a[dateField]);
    const datesB = parseDateStr(b[dateField]);

    // Primary sort: End Date Descending
    if (datesA.end !== datesB.end) {
       if (datesA.end === Infinity) return -1;
       if (datesB.end === Infinity) return 1;
       return datesB.end - datesA.end;
    }
    
    // Secondary sort: Start Date Descending
    return datesB.start - datesA.start;
  });
};

const SAMPLE_DATA = {
  personal: {
    name: "Juan Pérez",
    role: "Desarrollador Full Stack",
    email: "juan.perez@ejemplo.com",
    phone: "+34 123 456 789",
    location: "Madrid, España",
    linkedin: "linkedin.com/in/juanperez",
    website: "juanperez.dev",
    github: "github.com/juanperez",
    summary: "Desarrollador apasionado con más de 5 años de experiencia en la creación de aplicaciones web escalables. Especializado en JavaScript, React y Node.js. Comprometido con las mejores prácticas de código y la experiencia de usuario.",
    photo: null,
    showPhoto: true,
    documentType: "DNI",
    documentNumber: "12345678X",
    expeditionPlace: "Madrid",
    professionalLevel: "Senior"
  },
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Developer",
      duration: "2021 - Presente",
      description: "Liderazgo técnico del equipo de frontend. Migración de arquitectura monolítica a micro-frontends. Mejora del rendimiento de carga en un 40%."
    },
    {
      company: "WebStudio Agency",
      role: "Web Developer",
      duration: "2018 - 2021",
      description: "Desarrollo de sitios web corporativos y e-commerce para clientes internacionales. Implementación de diseños responsivos y accesibles."
    }
  ],
  education: [
    {
      institution: "Universidad Politécnica",
      degree: "Ingeniería en Informática",
      year: "2014 - 2018",
      description: "Especialización en Ingeniería del Software. Matrícula de Honor en Trabajo Fin de Grado."
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Tailwind CSS", "Git", "Docker", "AWS"],
  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "C1 - Avanzado" }
  ],
  projects: [
    {
      name: "E-commerce Dashboard",
      description: "Panel de administración para gestión de inventario y ventas en tiempo real.",
      link: "github.com/juanperez/dashboard"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    }
  ],
  hardSkills: ["Frontend Architecture", "CI/CD Pipelines", "Database Design"],
  softSkills: ["Liderazgo de equipos", "Comunicación efectiva", "Resolución de problemas"],
  references: [],
  referencesAvailableOnRequest: true
};

export const useCVStore = create(
  persist(
    (set) => ({
      cvData: SAMPLE_DATA,
      selectedTemplate: 'ModernDark',
      themeColor: '#2563eb', // Default blue-600
      design: {
        marginTop: 0,
        sectionGap: 10,
        lineHeight: 1.5,
        fontSize: 16,
        fontFamily: 'Inter',
        fontColor: '#334155'
      },
      language: 'es',
      activeTab: 'editor', // 'editor', 'templates'
      isSidebarOpen: true,
      
      setLanguage: (lang) => set({ language: lang }),
      
      updateDesign: (designUpdate) => set((state) => ({
         design: { ...state.design, ...designUpdate }
      })),

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

      removeSkill: (index) => set((state) => ({
        cvData: { ...state.cvData, skills: state.cvData.skills.filter((_, i) => i !== index) }
      })),

      updateSkill: (index, skill) => set((state) => {
        const newSkills = [...state.cvData.skills];
        newSkills[index] = skill;
        return { cvData: { ...state.cvData, skills: newSkills } };
      }),

      // Experience Actions
      addExperience: (experience) => set((state) => {
        const newExperience = [...state.cvData.experience, experience];
        return {
          cvData: { ...state.cvData, experience: sortItemsByDate(newExperience, 'duration') }
        };
      }),
      removeExperience: (index) => set((state) => ({
        cvData: { ...state.cvData, experience: state.cvData.experience.filter((_, i) => i !== index) }
      })),
      updateExperience: (index, experience) => set((state) => {
        const newExperience = [...state.cvData.experience];
        newExperience[index] = experience;
        return { cvData: { ...state.cvData, experience: sortItemsByDate(newExperience, 'duration') } };
      }),

      // Education Actions
      addEducation: (education) => set((state) => {
        const newEducation = [...state.cvData.education, education];
        return {
          cvData: { ...state.cvData, education: sortItemsByDate(newEducation, 'year') }
        };
      }),
      removeEducation: (index) => set((state) => ({
        cvData: { ...state.cvData, education: state.cvData.education.filter((_, i) => i !== index) }
      })),
      updateEducation: (index, education) => set((state) => {
        const newEducation = [...state.cvData.education];
        newEducation[index] = education;
        return { cvData: { ...state.cvData, education: sortItemsByDate(newEducation, 'year') } };
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
      addCertification: (cert) => set((state) => {
        const newCerts = [...state.cvData.certifications, cert];
        return {
          cvData: { ...state.cvData, certifications: sortItemsByDate(newCerts, 'date') }
        };
      }),
      removeCertification: (index) => set((state) => ({
        cvData: { ...state.cvData, certifications: state.cvData.certifications.filter((_, i) => i !== index) }
      })),
      updateCertification: (index, cert) => set((state) => {
        const newCerts = [...state.cvData.certifications];
        newCerts[index] = cert;
        return { cvData: { ...state.cvData, certifications: sortItemsByDate(newCerts, 'date') } };
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
      removeSoftSkill: (index) => set((state) => ({
        cvData: { ...state.cvData, softSkills: state.cvData.softSkills.filter((_, i) => i !== index) }
      })),
      updateSoftSkill: (index, skill) => set((state) => {
        const newSkills = [...state.cvData.softSkills];
        newSkills[index] = skill;
        return { cvData: { ...state.cvData, softSkills: newSkills } };
      }),

      // Data Management Actions
      savedCVs: [], // Array to store multiple CV profiles { id, name, lastModified, data }

      saveCV: (name) => set((state) => {
        const newCV = {
          id: crypto.randomUUID(),
          name: name || `CV ${new Date().toLocaleDateString()}`,
          lastModified: Date.now(),
          data: state.cvData,
          template: state.selectedTemplate,
          color: state.themeColor
        };
        return { savedCVs: [...state.savedCVs, newCV] };
      }),

      updateSavedCV: (id) => set((state) => {
        const updatedCVs = state.savedCVs.map(cv => 
          cv.id === id 
            ? { ...cv, lastModified: Date.now(), data: state.cvData, template: state.selectedTemplate, color: state.themeColor } 
            : cv
        );
        return { savedCVs: updatedCVs };
      }),

      loadSavedCV: (id) => set((state) => {
        const cvToLoad = state.savedCVs.find(cv => cv.id === id);
        if (!cvToLoad) return {};
        return {
          cvData: cvToLoad.data,
          selectedTemplate: cvToLoad.template || 'ModernDark',
          themeColor: cvToLoad.color || '#2563eb',
          activeTab: 'editor' // Switch back to editor
        };
      }),

      deleteSavedCV: (id) => set((state) => ({
        savedCVs: state.savedCVs.filter(cv => cv.id !== id)
      })),

      loadCVData: (data) => set((state) => {
        const sortedData = { ...data };
        if (sortedData.experience) sortedData.experience = sortItemsByDate(sortedData.experience, 'duration');
        if (sortedData.education) sortedData.education = sortItemsByDate(sortedData.education, 'year');
        if (sortedData.certifications) sortedData.certifications = sortItemsByDate(sortedData.certifications, 'date');
        
        return {
          cvData: { ...state.cvData, ...sortedData }
        };
      }),
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
      })),
      resetToSample: () => set({ cvData: SAMPLE_DATA }),
    }),
    {
      name: 'cv-storage-v2', // Changed version to force refresh
      partialize: (state) => ({ 
        cvData: state.cvData, 
        selectedTemplate: state.selectedTemplate,
        themeColor: state.themeColor,
        language: state.language,
        savedCVs: state.savedCVs // Persist saved CVs
      }), // Persist important data only, skip UI state like isSidebarOpen if desired, but here we persist main config.
    }
  )
);
