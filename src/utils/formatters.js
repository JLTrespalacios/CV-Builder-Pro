export const formatDate = (dateString, language = 'es') => {
  if (!dateString) return "";
  const date = new Date(dateString);
  // Adjust for timezone issues if necessary, but YYYY-MM-DD usually parses as UTC or local.
  // Ideally, append 'T12:00:00' to avoid timezone shifts if it's just a date.
  if (isNaN(date.getTime())) return dateString;
  
  try {
    return new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric' }).format(date);
  } catch (e) {
    return dateString;
  }
};

export const formatDateRange = (duration, t, language = 'es') => {
  if (!duration) return "";
  
  // Handle legacy string format
  if (typeof duration === 'string') return duration;
  
  const { start, end, isPresent } = duration;
  if (!start && !end && !isPresent) return "";

  const startStr = start ? formatDate(start, language) : "";
  
  if (isPresent) {
    return startStr ? `${startStr} - ${t.present}` : t.present;
  }
  
  const endStr = end ? formatDate(end, language) : "";
  return startStr && endStr ? `${startStr} - ${endStr}` : (startStr || endStr);
};

export const getProfessionalLevelLabel = (level, t) => {
  if (!level) return "";
  
  const map = {
    "Junior": t.levelJunior,
    "Semi-Senior": t.levelSemiSenior,
    "Senior": t.levelSenior,
    "Tech Lead": t.levelTechLead,
    "Architect": t.levelArchitect,
    "Manager": t.levelManager
  };

  return map[level] || level;
};

export const getDocumentTypeLabel = (type, t) => {
  if (!type) return "";
  
  const map = {
    "C.C.": t.idCard,
    "NIT": t.nit,
    "Pasaporte": t.passport,
    "C.E.": t.foreignId
  };

  return map[type] || type;
};
