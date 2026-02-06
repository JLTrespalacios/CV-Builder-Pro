
export const ROLE_DATA = {
  // --- TECH PROFILES ---
  'Tech': {
    default: {
      personal: {
        role: "Software Engineer",
        summary: "Ingeniero de software con experiencia en desarrollo de aplicaciones escalables, enfocado en arquitectura limpia y rendimiento, colaborando con equipos multidisciplinarios.",
        professionalLevel: "Mid/Senior"
      },
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Docker", "AWS", "CI/CD", "Agile"],
      hardSkills: ["System Design", "API Development", "Database Optimization", "Clean Code"],
      softSkills: ["Resolución de problemas", "Trabajo en equipo", "Comunicación técnica"],
    },
    'Frontend': {
      personal: {
        role: "Frontend Developer",
        summary: "Desarrollador Frontend con 5 años de experiencia creando interfaces escalables y accesibles. Especializado en React, TypeScript y diseño centrado en el usuario.",
        professionalLevel: "Senior"
      },
      skills: ["React", "TypeScript", "UI", "Performance", "JavaScript ES6+", "Responsive Design", "REST APIs", "GraphQL", "CI/CD", "Clean Code"],
      hardSkills: ["Frontend Architecture", "Web Performance", "Accessibility (a11y)", "State Management"],
      experience: [
        {
          company: "Tech Solutions",
          role: "Frontend Developer",
          duration: "2021 - Actualidad",
          description: "Desarrollo de aplicaciones SPA con React y Next.js. Optimización de performance (+35%). Colaboración con equipos UX y backend."
        }
      ],
      projects: [
        {
          name: "Dashboard Financiero SaaS",
          technologies: "React · Tailwind · API REST",
          description: "Panel administrativo con React, Tailwind y API REST. Soporta +20K usuarios activos con una reducción de tiempo de carga del 40%.",
          link: "github.com/usuario/dashboard-finanzas"
        }
      ]
    },
    'Backend': {
      personal: {
        role: "Backend Engineer",
        summary: "Ingeniero Backend enfocado en arquitectura de microservicios, APIs robustas y procesamiento de datos a gran escala.",
        professionalLevel: "Senior"
      },
      skills: ["APIs", "Microservices", "Cloud", "Databases", "Node.js", "Python", "Java", "Docker", "Kubernetes", "SQL", "NoSQL"],
      hardSkills: ["Distributed Systems", "API Design", "Database Modeling", "Security"],
      projects: [
        {
          name: "API de Pagos Global",
          technologies: "Node.js · Redis · Docker",
          description: "Sistema de procesamiento de pagos de alta disponibilidad. Integración con múltiples pasarelas y manejo de concurrencia segura.",
          link: "github.com/usuario/api-pagos"
        }
      ]
    },
    'Full Stack': {
      personal: {
        role: "Full Stack Developer",
        summary: "Desarrollador Full Stack con capacidad para construir aplicaciones web completas, desde bases de datos optimizadas hasta interfaces de usuario intuitivas.",
        professionalLevel: "Mid/Senior"
      },
      skills: ["Frontend", "Full Stack", "React", "Node.js", "TypeScript", "PostgreSQL", "Next.js", "Tailwind CSS", "Docker", "AWS"],
      hardSkills: ["End-to-End Development", "Database Architecture", "API Integration", "State Management"],
      experience: [
        {
          company: "StartUp Innovadora",
          role: "Full Stack Developer",
          duration: "2020 - Actualidad",
          description: "Desarrollo integral de plataforma SaaS. Implementación de CI/CD, testing automatizado y arquitectura escalable."
        }
      ],
      projects: [
        {
          name: "Plataforma E-learning",
          technologies: "Next.js · NestJS · PostgreSQL",
          description: "Plataforma educativa con streaming de video, pagos y gestión de usuarios. +5k estudiantes activos.",
          link: "github.com/usuario/elearning-platform"
        }
      ]
    },
    'Data': {
      personal: {
        role: "Data Scientist / Analyst",
        summary: "Científico de datos especializado en transformar información compleja en estrategias de negocio mediante Machine Learning y visualización avanzada.",
        professionalLevel: "Mid"
      },
      skills: ["Data Analysis", "ETL Pipelines", "Python", "SQL", "Pandas", "Tableau", "PowerBI", "Scikit-learn", "Big Data"],
      hardSkills: ["Machine Learning", "Statistical Analysis", "Data Visualization", "Data Modeling"],
      projects: [
        {
          name: "Predicción de Churn",
          technologies: "Python · Scikit-learn · Pandas",
          description: "Modelo predictivo para identificar clientes en riesgo de cancelación. Mejoró la retención en un 15% mediante acciones preventivas.",
          link: "github.com/usuario/churn-prediction"
        }
      ]
    },
    'Tech Lead': {
      personal: {
        role: "Tech Lead / Engineering Manager",
        summary: "Líder técnico con historial comprobado en entrega de software de alto impacto. Experto en mentoría de equipos, definición de arquitectura y alineación estratégica con negocio.",
        professionalLevel: "Lead"
      },
      skills: ["Leadership", "Architecture", "Agile", "Cloud", "Performance", "System Design", "Team Building", "Stakeholder Management"],
      hardSkills: ["Scalable Architecture", "Technical Strategy", "Risk Management"],
      experience: [
        {
          company: "Innovate Tech",
          role: "Senior Tech Lead",
          duration: "2019 - Presente",
          description: "Liderazgo de equipo de 10 ingenieros. Rediseño de arquitectura legacy a microservicios, reduciendo costos operativos en 30% y time-to-market en 50%."
        }
      ]
    }
  },
  
  // --- CREATIVE PROFILES ---
  'Creative': {
    default: {
      personal: {
        role: "Creative Professional",
        summary: "Diseñador creativo especializado en comunicación visual estratégica, enfocado en construir marcas coherentes y memorables.",
        professionalLevel: "Mid"
      },
      skills: ["Adobe Creative Suite", "Figma", "Branding", "Visual Communication", "Art Direction", "Layout Design"],
      hardSkills: ["Visual Identity", "Concept Development", "Typography", "Color Theory"],
      softSkills: ["Creatividad", "Pensamiento Crítico", "Adaptabilidad"],
    },
    'Diseño Gráfico': {
      personal: {
        role: "Brand & Visual Designer",
        summary: "Diseñador gráfico enfocado en crear identidades visuales sólidas que conectan marcas con personas. Pasión por la tipografía y el color.",
        professionalLevel: "Mid"
      },
      skills: ["Brand Identity", "Visual Communication", "Layout Design", "Adobe Creative Suite", "Art Direction", "Digital Branding", "Print Design"],
      hardSkills: ["Logo Design", "Packaging", "Editorial Design"],
      projects: [
        {
          name: "Rebranding Marca Retail",
          technologies: "Illustrator · Photoshop · Strategy",
          description: "Identidad visual completa, packaging y estrategia de comunicación digital. Incremento del reconocimiento de marca en un 25%.",
          link: "behance.net/gallery/rebranding"
        }
      ]
    },
    'UX/UI': {
      personal: {
        role: "UX/UI Designer",
        summary: "Diseñador UX/UI centrado en crear experiencias digitales intuitivas y accesibles. Enfoque en investigación de usuarios y diseño basado en datos.",
        professionalLevel: "Senior"
      },
      skills: ["User Research", "Wireframes", "Usability", "Prototyping", "Design Systems", "Figma", "Interaction Design", "Usability Testing"],
      hardSkills: ["User Journey Mapping", "Information Architecture", "Accessibility"],
      projects: [
        {
          name: "App Bancaria Móvil",
          technologies: "Figma · Prototyping · User Testing",
          description: "Rediseño completo enfocado en accesibilidad y facilidad de uso. Aumentó la satisfacción del usuario (NPS) en 20 puntos.",
          link: "dribbble.com/shots/banking-app"
        }
      ]
    },
    'Fashion': {
      personal: {
        role: "Fashion Designer",
        summary: "Diseñador de moda con visión innovadora y técnica sólida. Experiencia en desarrollo de colecciones desde el concepto hasta la producción.",
        professionalLevel: "Junior/Mid"
      },
      skills: ["Fashion Design", "Collection", "Styling", "Textile Development", "Trend Analysis", "Pattern Making", "Illustrator"],
      hardSkills: ["Technical Sketching", "Fabric Selection", "Production Management"],
      projects: [
        {
          name: "Colección Sostenible 2024",
          technologies: "Textile Innovation · Eco-Design",
          description: "Línea de ropa urbana utilizando materiales 100% reciclados. Presentada en la semana de la moda local.",
          link: "portfolio.com/coleccion-sostenible"
        }
      ]
    }
  },

  // --- GENERAL / LEVEL PROFILES ---
  'General': {
    default: {
      personal: {
        role: "Professional",
        summary: "Profesional enfocado en resultados con experiencia en gestión de proyectos y mejora de procesos.",
        professionalLevel: "Mid"
      },
      skills: ["Project Management", "Communication", "Problem Solving", "Strategic Planning"],
      hardSkills: ["Data Analysis", "Reporting", "Process Improvement"],
      softSkills: ["Leadership", "Teamwork", "Adaptability"]
    },
    'Junior': {
      personal: {
        role: "Junior Professional",
        summary: "Profesional motivado y con ganas de aprender, buscando oportunidades para aplicar habilidades y crecer profesionalmente.",
        professionalLevel: "Junior"
      },
      skills: ["Learning", "Skills", "Projects", "Growth", "Research", "Documentation", "Communication"],
      hardSkills: ["Microsoft Office", "Basic Data Analysis", "Research Methods"],
      projects: [
        {
          name: "Proyecto Académico Final",
          technologies: "Research · Analysis · Presentation",
          description: "Investigación y análisis de tendencias de mercado. Presentación de hallazgos ante panel académico con mención honorífica.",
          link: "linkedin.com/in/perfil"
        }
      ]
    },
    'Senior': {
      personal: {
        role: "Senior Manager",
        summary: "Ejecutivo senior con +10 años de experiencia liderando equipos de alto rendimiento y estrategias de crecimiento.",
        professionalLevel: "Senior"
      },
      skills: ["Experience", "Results", "Leadership", "Strategic Leadership", "P&L Management", "Change Management"],
      hardSkills: ["Financial Analysis", "Business Strategy", "Operational Excellence"],
      experience: [
        {
          company: "Global Corp",
          role: "Senior Manager",
          duration: "2015 - Presente",
          description: "Dirección de operaciones regionales. Incremento de rentabilidad en un 20% anual sostenido y optimización de procesos clave."
        }
      ]
    },
    'Lead': {
      personal: {
        role: "Director / VP",
        summary: "Líder visionario experto en transformación organizacional y definición de estrategias corporativas a largo plazo.",
        professionalLevel: "Executive"
      },
      skills: ["Leadership", "Strategy", "Team Management", "Vision", "Executive Leadership", "Corporate Governance", "Innovation Strategy"],
      hardSkills: ["M&A Integration", "Global Strategy", "Risk Mitigation"],
      experience: [
        {
          company: "Enterprise Inc.",
          role: "Director of Strategy",
          duration: "2018 - Presente",
          description: "Definición y ejecución de la estrategia global de la compañía. Liderazgo de equipos multidisciplinarios en 3 continentes."
        }
      ]
    }
  }
};

export const getRoleData = (profile, role) => {
  const profileData = ROLE_DATA[profile];
  if (!profileData) return null;

  // Try to find exact match or case-insensitive match
  const roleKey = Object.keys(profileData).find(k => k.toLowerCase() === role?.toLowerCase()) || role;
  const roleSpecificData = profileData[roleKey];
  const defaultData = profileData.default;

  // Merge specific data over default data
  return {
    ...defaultData,
    ...roleSpecificData,
    personal: { ...defaultData.personal, ...roleSpecificData?.personal },
    // Arrays are replaced, not merged, to avoid duplication of generic items if specific ones exist
    skills: roleSpecificData?.skills || defaultData.skills,
    hardSkills: roleSpecificData?.hardSkills || defaultData.hardSkills,
    softSkills: roleSpecificData?.softSkills || defaultData.softSkills,
    experience: roleSpecificData?.experience || defaultData.experience || [],
    projects: roleSpecificData?.projects || defaultData.projects || []
  };
};
