import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';

const SectionAccordion = ({ title, icon: Icon, children, isOpen, onToggle, isComplete = false }) => {
  return (
    <div className={`mb-4 rounded-xl border transition-all duration-300 overflow-hidden ${
      isOpen 
        ? 'bg-[var(--bg-panel)] border-blue-200 shadow-md ring-1 ring-blue-500/10' 
        : 'bg-[var(--bg-panel)] border-[var(--border-subtle)] hover:border-blue-300 shadow-sm hover:shadow-md'
    }`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
          isOpen ? 'bg-blue-50/50 text-blue-700' : 'hover:bg-[var(--bg-muted)] text-[var(--text-secondary)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${
            isOpen ? 'bg-blue-100 text-blue-600' : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] group-hover:text-blue-500'
          }`}>
            {Icon && <Icon size={20} />}
          </div>
          <span className={`font-semibold tracking-wide text-sm uppercase ${isOpen ? 'text-blue-900' : 'text-[var(--text-main)]'}`}>
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {isComplete && (
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle2 size={12} />
              <span>OK</span>
            </div>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} className={isOpen ? 'text-blue-500' : 'text-[var(--text-secondary)]'} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-5 border-t border-blue-100 bg-[var(--bg-panel)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionAccordion;
