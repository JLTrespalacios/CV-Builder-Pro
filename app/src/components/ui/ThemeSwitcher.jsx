import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { Palette, Monitor, Moon, Zap, Box } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'hybrid', label: 'Híbrido', icon: Monitor, color: 'bg-blue-600' },
  { id: 'minimal', label: 'Minimal', icon: Palette, color: 'bg-neutral-900' },
  { id: 'dark', label: 'Dark', icon: Moon, color: 'bg-slate-800' },
  { id: 'neon', label: 'Neon', icon: Zap, color: 'bg-cyan-500' },
  { id: '3d', label: '3D', icon: Box, color: 'bg-indigo-600' }
];

const ThemeSwitcher = () => {
  const { appTheme, setAppTheme } = useUIStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const activeTheme = themes.find(t => t.id === appTheme) || themes[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[var(--bg-panel)] hover:bg-[var(--bg-muted)] border border-[var(--border-subtle)] hover:border-[var(--primary)]/30 rounded-xl px-3 py-1.5 transition-all hover:shadow-md hover:-translate-y-0.5 group"
        aria-label="Cambiar tema de interfaz"
      >
        <div className={`w-4 h-4 rounded-full ${activeTheme.color} shadow-sm ring-2 ring-white/20 group-hover:scale-110 transition-transform`} />
        <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-main)] transition-colors hidden sm:block">{activeTheme.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-transparent" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-0 mt-3 w-48 bg-[var(--bg-panel)]/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-[var(--border-subtle)] overflow-hidden z-50 p-1.5 ring-1 ring-black/5"
            >
              <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider px-3 py-2 opacity-70">
                Interfaz
              </div>
              {themes.map((theme) => {
                const Icon = theme.icon;
                const isActive = appTheme === theme.id;
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setAppTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium shadow-sm' 
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-secondary)]'}`}>
                      <Icon size={14} className={isActive ? 'text-white' : 'text-inherit'} />
                    </div>
                    {theme.label}
                    {isActive && (
                      <motion.div layoutId="activeDot" className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
