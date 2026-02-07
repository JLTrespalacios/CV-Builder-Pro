
// Dictionary of common CV terms for automatic translation
const DICTIONARY = {
  // Roles & Titles
  roles: {
    es: [
      "Desarrollador", "Ingeniero", "Analista", "Gerente", "Diseñador", "Arquitecto", "Consultor", "Administrador", "Director", "Técnico", "Especialista",
      "Desarrollador Frontend", "Desarrollador Backend", "Desarrollador Full Stack", "Ingeniero de Software", "Científico de Datos", "Diseñador UX/UI"
    ],
    en: [
      "Developer", "Engineer", "Analyst", "Manager", "Designer", "Architect", "Consultant", "Administrator", "Director", "Technician", "Specialist",
      "Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer", "Data Scientist", "UX/UI Designer"
    ],
    fr: [
      "Développeur", "Ingénieur", "Analyste", "Manager", "Designer", "Architecte", "Consultant", "Administrateur", "Directeur", "Technicien", "Spécialiste",
      "Développeur Frontend", "Développeur Backend", "Développeur Full Stack", "Ingénieur Logiciel", "Data Scientist", "Designer UX/UI"
    ]
  },
  
  // Professional Levels
  levels: {
    es: ["Junior", "Semi-Senior", "Senior", "Líder Técnico", "Arquitecto", "Gerente", "Becario", "Estudiante"],
    en: ["Junior", "Mid-Level", "Senior", "Tech Lead", "Architect", "Manager", "Intern", "Student"],
    fr: ["Junior", "Confirmé", "Sénior", "Lead Tech", "Architecte", "Manager", "Stagiaire", "Étudiant"]
  },

  // Time & Dates
  time: {
    es: ["Presente", "Actualidad", "Actualmente", "Hoy", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    en: ["Present", "Current", "Currently", "Today", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    fr: ["Présent", "Actuel", "Actuellement", "Aujourd'hui", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  },

  // Skills Categories (common ones)
  skills: {
    es: ["Idiomas", "Habilidades", "Técnicas", "Blandas", "Herramientas", "Lenguajes", "Frameworks"],
    en: ["Languages", "Skills", "Hard Skills", "Soft Skills", "Tools", "Languages", "Frameworks"],
    fr: ["Langues", "Compétences", "Techniques", "Douces", "Outils", "Langages", "Frameworks"]
  },

  // Language Levels
  langLevels: {
    es: ["Nativo", "Básico", "Intermedio", "Avanzado", "Fluido", "Principiante"],
    en: ["Native", "Basic", "Intermediate", "Advanced", "Fluent", "Beginner"],
    fr: ["Natif", "Basique", "Intermédiaire", "Avancé", "Courant", "Débutant"]
  }
};

/**
 * Helper to find and replace terms based on the dictionary
 */
const translateTerm = (term, fromLang, toLang, category) => {
  if (!term || !DICTIONARY[category]) return term;
  
  const fromList = DICTIONARY[category][fromLang];
  const toList = DICTIONARY[category][toLang];
  
  if (!fromList || !toList) return term;

  const index = fromList.findIndex(item => item.toLowerCase() === term.toLowerCase());
  
  if (index !== -1 && toList[index]) {
    return toList[index];
  }
  
  // Try partial match for roles (e.g. "Senior Developer" -> "Desarrollador Senior")
  // This is a simple heuristic and might not work for complex phrases
  return term;
};

/**
 * Main translation function for CV Data
 */
export const translateCVData = (data, fromLang, toLang) => {
  if (fromLang === toLang) return data;

  const newData = JSON.parse(JSON.stringify(data)); // Deep clone

  // 1. Translate Personal Info
  if (newData.personal) {
    newData.personal.role = translateTerm(newData.personal.role, fromLang, toLang, 'roles');
    newData.personal.professionalLevel = translateTerm(newData.personal.professionalLevel, fromLang, toLang, 'levels');
  }

  // 2. Translate Experience
  if (newData.experience) {
    newData.experience = newData.experience.map(exp => ({
      ...exp,
      role: translateTerm(exp.role || exp.position, fromLang, toLang, 'roles'), // Handle both role/position keys if they exist
      position: translateTerm(exp.position || exp.role, fromLang, toLang, 'roles'),
      duration: translateDateString(exp.duration, fromLang, toLang)
    }));
  }

  // 3. Translate Education
  if (newData.education) {
    newData.education = newData.education.map(edu => ({
      ...edu,
      year: translateDateString(edu.year, fromLang, toLang)
    }));
  }

  // 4. Translate Languages
  if (newData.languages) {
    newData.languages = newData.languages.map(lang => ({
      ...lang,
      level: translateTerm(lang.level, fromLang, toLang, 'langLevels'),
      language: translateTerm(lang.language, fromLang, toLang, 'skills') // "Español" -> "Spanish" (Need to add languages to dict)
    }));
  }
  
  // 5. Translate Certifications
  if (newData.certifications) {
    newData.certifications = newData.certifications.map(cert => ({
      ...cert,
      date: translateDateString(cert.date, fromLang, toLang)
    }));
  }

  return newData;
};

/**
 * Helper to translate date strings like "Jan 2020 - Present"
 */
const translateDateString = (dateStr, fromLang, toLang) => {
  if (!dateStr) return dateStr;
  
  let newStr = dateStr;
  
  // Translate months and keywords
  const fromTerms = DICTIONARY.time[fromLang];
  const toTerms = DICTIONARY.time[toLang];
  
  fromTerms.forEach((term, index) => {
    // Case insensitive replacement
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    if (toTerms[index]) {
      newStr = newStr.replace(regex, toTerms[index]);
    }
  });

  return newStr;
};
