import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const SectionAccordion = ({ title, icon: Icon, children, isOpen, onToggle, isComplete = false }) => {
  return (
    <div className={`mb-4 rounded-2xl border transition-all duration-300 overflow-hidden group ${
      isOpen 
        ? 'bg-[var(--bg-panel)] border-[var(--primary)]/30 shadow-lg shadow-[var(--primary)]/5 ring-1 ring-[var(--primary)]/20' 
        : 'bg-[var(--bg-panel)] border-[var(--border-subtle)] hover:border-[var(--primary)]/30 shadow-sm hover:shadow-md'
    }`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 ${
          isOpen ? 'bg-[var(--primary-light)]/20' : 'hover:bg-[var(--bg-muted)]'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl transition-all duration-300 ${
            isOpen 
              ? 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20' 
              : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:bg-[var(--primary-light)]/30'
          }`}>
            {Icon && <Icon size={20} />}
          </div>
          <div className="flex flex-col">
            <span className={`font-bold tracking-wide text-sm uppercase transition-colors ${
              isOpen ? 'text-[var(--primary)]' : 'text-[var(--text-main)] group-hover:text-[var(--primary)]'
            }`}>
              {title}
            </span>
            {isComplete && !isOpen && (
              <span className="text-[10px] text-emerald-600 font-medium">Completado</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isComplete && (
            <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              isOpen 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                : 'bg-emerald-50/50 text-emerald-600/70 border-emerald-100'
            }`}>
              <CheckCircle2 size={12} />
              <span className="hidden sm:inline">LISTO</span>
            </div>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className={`p-1 rounded-full ${isOpen ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-6 border-t border-[var(--primary)]/10 bg-[var(--bg-panel)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionAccordion;
