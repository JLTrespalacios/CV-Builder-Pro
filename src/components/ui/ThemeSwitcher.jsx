import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { Palette, Monitor, Moon, Zap, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        className="flex items-center gap-2 bg-slate-50/50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 transition-all hover-btn"
        aria-label="Cambiar tema de interfaz"
      >
        <div className={`w-4 h-4 rounded-full ${activeTheme.color} shadow-sm`} />
        <span className="text-xs font-medium text-slate-700 hidden sm:block">{activeTheme.label}</span>
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
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 p-1"
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
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
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors hover-list-item ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isActive ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <Icon size={14} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
                    </div>
                    {theme.label}
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
