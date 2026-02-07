import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸', short: 'ES' },
  { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' }
];

const LanguageSelector = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 group
          ${isOpen 
            ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)] shadow-sm' 
            : 'bg-[var(--bg-panel)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--primary)]/30 hover:text-[var(--text-main)] hover:shadow-md hover:-translate-y-0.5'
          }
        `}
        title="Cambiar idioma"
      >
        <Globe size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--primary)]' : 'group-hover:text-[var(--primary)]'}`} />
        <span className="text-xs font-bold tracking-wider">{selected.short}</span>
        <ChevronDown size={12} className={`opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-48 bg-[var(--bg-panel)]/95 backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl shadow-xl overflow-hidden z-50 ring-1 ring-black/5"
          >
            <div className="p-1.5 flex flex-col gap-1">
              <div className="px-3 py-2 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider opacity-70">
                Seleccionar Idioma
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs font-medium transition-all group
                    ${currentLang === lang.code 
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)]' 
                      : 'text-[var(--text-main)] hover:bg-[var(--bg-muted)]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg leading-none filter drop-shadow-sm">{lang.flag}</span>
                    <span className={`transition-colors ${currentLang === lang.code ? 'font-bold' : ''}`}>{lang.label}</span>
                  </div>
                  {currentLang === lang.code && (
                    <motion.div
                      layoutId="activeLangCheck"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check size={14} className="text-[var(--primary)]" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
