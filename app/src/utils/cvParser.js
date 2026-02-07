import { TECH_SKILLS_DB, SOFT_SKILLS_DB } from '../constants/skillsDB';

/**
 * Advanced Heuristic CV Parser
 * "Smart Import" Logic
 */

// Regex Patterns
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const LINK_REGEX = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(?:\/[^\s]*)?/g;

// Date Patterns (Crucial for splitting blocks)
// Matches: "2020 - 2021", "Jan 2020 - Present", "01/2020 - 02/2021", "2020", "Presente", "Actualidad"
const DATE_RANGE_REGEX = /((?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic|enero|feb|marzo|abril|mayo|junio|julio|agosto|sept|oct|nov|dic)[a-z]*\.?\s*)?\d{4}|present|actual|current|ahora)\s*[-–]\s*((?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)[a-z]*\.?\s*)?\d{4}|present|actual|current|ahora)/i;
const SINGLE_YEAR_REGEX = /\b(19|20)\d{2}\b/;

const SECTION_KEYWORDS = {
  experience: ['experiencia', 'experience', 'work history', 'laboral', 'trayectoria', 'employment'],
  education: ['educación', 'education', 'formación', 'academic', 'estudios', 'university', 'college', 'degree'],
  skills: ['habilidades', 'skills', 'competencias', 'technologies', 'tecnologías', 'conocimientos', 'stack'],
  languages: ['idiomas', 'languages', 'lenguas'],
  projects: ['proyectos', 'projects', 'portafolio', 'portfolio'],
  certifications: ['certificaciones', 'certifications', 'diplomas', 'cursos', 'courses']
};

/**
 * Normalizes text to handle PDF weirdness (double spaces, weird newlines)
 */
const normalizeText = (text) => {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\u00A0/g, ' ') // Non-breaking space
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0); // Remove empty lines
};

/**
 * Extracts sections from lines using scoring and keywords
 */
const segmentSections = (lines) => {
  const sections = {};
  let currentSection = 'summary';
  let buffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();
    
    // Check if line is a header
    let detectedSection = null;
    
    // Header heuristics: 
    // 1. Must match a keyword
    // 2. Short length (< 40 chars)
    // 3. Usually all caps or ends with colon (optional but good signal)
    if (line.length < 50) {
      for (const [key, keywords] of Object.entries(SECTION_KEYWORDS)) {
        if (keywords.some(k => lower === k || lower === k + ':' || lower.startsWith(k + ' ') || lower.endsWith(' ' + k))) {
          detectedSection = key;
          break;
        }
      }
    }

    if (detectedSection) {
      if (currentSection) {
        sections[currentSection] = buffer;
      }
      currentSection = detectedSection;
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  
  // Flush last buffer
  if (currentSection) {
    sections[currentSection] = buffer;
  }
  
  return sections;
};

/**
 * Smartly parses a block of text into items (Experience/Education)
 * Uses Date Patterns to split entries
 */
const parseChronologicalItems = (lines, type = 'experience') => {
  const items = [];
  let currentItem = null;
  
  const flushItem = () => {
    if (currentItem) {
      // Clean up description
      currentItem.description = currentItem.descriptionLines.join('\n').trim();
      delete currentItem.descriptionLines;
      
      // Infer Role/Company from "title" lines if not set
      // The parser collects lines BEFORE the date as title candidates usually, 
      // or lines AFTER the date if the date is the header.
      
      // Strategy: 
      // 1. If we have a 'headerLine' (line containing the date), check if it has text besides the date.
      // 2. If the line ABOVE the date exists and is short, it's likely the Role or Company.
      
      items.push(currentItem);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for Date Range (Strong Signal for new item)
    const dateMatch = line.match(DATE_RANGE_REGEX);
    
    if (dateMatch) {
      // Found a date! Start new item.
      flushItem();
      
      currentItem = {
        dateRaw: dateMatch[0],
        descriptionLines: [],
        // Heuristic: The text in this line *excluding* the date might be role/company
        headerLine: line.replace(dateMatch[0], '').trim() 
      };
      
      // Check previous line for context (often Role is above Date)
      if (i > 0) {
         const prevLine = lines[i-1];
         // If prev line was short and not part of previous description (hard to know),
         // but in PDF, headers often come together.
         // Let's assume prev line is the Role/Company
         currentItem.roleCandidate = prevLine;
      }
      
      continue;
    }
    
    // If we are in an item, add to description
    if (currentItem) {
      currentItem.descriptionLines.push(line);
    } else {
      // Loose text before first date found -> Summary or trash?
      // Or maybe a date-less item?
      // For now, ignore or add to a "General" item if needed.
    }
  }
  
  flushItem();
  
  // Post-process items to map fields
  return items.map(item => {
    let role = "Rol Detectado";
    let company = "Empresa/Institución";
    let duration = item.dateRaw || "Fechas";
    
    // Smart Field Mapping
    if (item.roleCandidate) {
      role = item.roleCandidate;
      if (item.headerLine && item.headerLine.length > 2) {
        company = item.headerLine;
      }
    } else if (item.headerLine && item.headerLine.length > 2) {
      // Try to split header line? e.g. "Senior Dev at Google"
      if (item.headerLine.toLowerCase().includes(' at ')) {
        const parts = item.headerLine.split(/ at /i);
        role = parts[0].trim();
        company = parts[1].trim();
      } else if (item.headerLine.includes('|')) {
         const parts = item.headerLine.split('|');
         role = parts[0].trim();
         company = parts[1].trim();
      } else {
         role = item.headerLine;
      }
    }
    
    // If it's education, map differently
    if (type === 'education') {
      return {
        school: company, // reusing logic
        degree: role,
        year: duration,
        description: item.description
      };
    }
    
    return {
      role,
      company,
      duration,
      description: item.description
    };
  });
};

/**
 * Scans text for skills from the database
 */
const extractSkills = (fullText) => {
  const foundSkills = new Set();
  const lowerText = fullText.toLowerCase();
  
  TECH_SKILLS_DB.forEach(skill => {
    // Word boundary check to avoid partial matches (e.g. "C" in "Center")
    // Escape special regex chars in skill name (like C++, C#)
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    
    // C++ and C# need special handling because #/+ are boundaries in regex sometimes? 
    // Actually \b matches between \w and \W. + is \W. So C++ \b matches after C. 
    // We'll just use simple includes for complex symbols, or strict regex.
    
    if (skill === 'C++' || skill === 'C#') {
       if (fullText.includes(skill)) foundSkills.add(skill);
    } else {
       if (regex.test(fullText)) foundSkills.add(skill);
    }
  });
  
  return Array.from(foundSkills).slice(0, 15); // Top 15
};

export const parseCVText = (rawText) => {
  const lines = normalizeText(rawText);
  const sections = segmentSections(lines);
  
  // Initial Structure
  const cvData = {
    personal: {
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      professionalLevel: 'Mid-Level'
    },
    experience: [],
    education: [],
    skills: [], // Legacy string array
    languages: [],
    projects: [],
    certifications: [],
    hardSkills: [],
    softSkills: []
  };

  // 1. Personal Info Extraction
  // Look in the first 20 lines (Summary usually comes later)
  const headerLines = lines.slice(0, 20);
  const fullHeaderText = headerLines.join(' ');
  
  // Email & Phone
  const emailMatch = rawText.match(EMAIL_REGEX);
  if (emailMatch) cvData.personal.email = emailMatch[0];
  
  const phoneMatch = rawText.match(PHONE_REGEX);
  if (phoneMatch) cvData.personal.phone = phoneMatch[0];
  
  // Name: First line that isn't a keyword?
  // Often the name is the very first line with significant text.
  for (let line of headerLines) {
     if (line.length > 3 && line.length < 30 && !line.includes('@')) {
        cvData.personal.name = line;
        break;
     }
  }
  
  // Role: Often under name
  if (cvData.personal.name) {
    const idx = headerLines.indexOf(cvData.personal.name);
    if (idx !== -1 && headerLines[idx+1]) {
       cvData.personal.role = headerLines[idx+1];
    }
  }
  
  // Summary: Section 'summary' or inferred
  if (sections.summary) {
    let summaryText = sections.summary.join('\n');
    // Clean up name/email from summary if they were captured
    if (cvData.personal.name) summaryText = summaryText.replace(cvData.personal.name, '');
    if (cvData.personal.email) summaryText = summaryText.replace(cvData.personal.email, '');
    cvData.personal.summary = summaryText.trim();
  }

  // 2. Smart Experience Parsing
  if (sections.experience) {
    const expItems = parseChronologicalItems(sections.experience, 'experience');
    if (expItems.length > 0) {
      cvData.experience = expItems.map(item => ({
        company: item.company,
        role: item.role,
        duration: item.duration,
        description: item.description
      }));
    } else {
       // Fallback: Dump text if no dates found
       cvData.experience.push({
         company: "Empresa (No detectada)",
         role: "Rol (No detectado)",
         duration: "Fechas",
         description: sections.experience.join('\n')
       });
    }
  }

  // 3. Smart Education Parsing
  if (sections.education) {
    const eduItems = parseChronologicalItems(sections.education, 'education');
    if (eduItems.length > 0) {
       cvData.education = eduItems.map(item => ({
         school: item.school,
         degree: item.degree,
         year: item.year,
         description: item.description
       }));
    } else {
       cvData.education.push({
         school: "Institución",
         degree: "Título",
         year: "Año",
         description: sections.education.join('\n')
       });
    }
  }

  // 4. Smart Skill Extraction (Global Scan)
  const detectedSkills = extractSkills(rawText);
  cvData.hardSkills = detectedSkills;
  
  // 5. Languages (Basic list split)
  if (sections.languages) {
     const langText = sections.languages.join(' ');
     // Split by common delimiters
     const langs = langText.split(/[,•|]/).map(s => s.trim()).filter(s => s.length > 2);
     langs.forEach(l => {
        // Simple heuristic for level
        let level = 'Intermedio';
        if (l.toLowerCase().includes('native') || l.toLowerCase().includes('nativo')) level = 'Nativo';
        if (l.toLowerCase().includes('advanced') || l.toLowerCase().includes('avanzado')) level = 'Avanzado';
        
        // Clean language name
        const name = l.replace(/\(.*\)/, '').replace(/Level/, '').trim();
        cvData.languages.push({ language: name, level });
     });
  }

  return cvData;
};
