import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Target, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';
import { motion, AnimatePresence } from 'framer-motion';

const ProTipsPanel = () => {
  const { language } = useCVStore();
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      title: t.tipGoogleFormula,
      text: t.tipGoogleFormulaText,
      icon: <Target size={18} className="text-blue-600" />,
      color: "bg-blue-50 border-blue-200 ring-1 ring-blue-100"
    },
    {
      title: t.tipActionVerbs,
      text: t.tipActionVerbsText,
      icon: <TrendingUp size={18} className="text-green-600" />,
      color: "bg-green-50 border-green-200 ring-1 ring-green-100"
    },
    {
      title: t.tipQuantify,
      text: t.tipQuantifyText,
      icon: <CheckCircle size={18} className="text-purple-600" />,
      color: "bg-purple-50 border-purple-200 ring-1 ring-purple-100"
    },
    {
      title: t.tipATS,
      text: t.tipATSText,
      icon: <Lightbulb size={18} className="text-amber-600" />,
      color: "bg-amber-50 border-amber-200 ring-1 ring-amber-100"
    }
  ];

  return (
    <div className="mt-8 relative z-20">
      <motion.div 
        className="bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-2xl shadow-xl shadow-amber-500/5 overflow-hidden"
        initial={false}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-amber-50/80 to-white hover:from-amber-100/80 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
               <Sparkles size={20} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-amber-700 transition-colors">{t.proTipsTitle}</h3>
              <p className="text-[10px] text-slate-500 font-medium">Consejos de experto para destacar</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className="text-slate-400 group-hover:text-amber-500" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-5 space-y-3 bg-white/50 pt-0">
                <div className="h-px bg-slate-100 mb-4" />
                {tips.map((tip, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${tip.color} flex gap-4 items-start hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 bg-white/80 cursor-default group`}
                  >
                    <div className="mt-0.5 flex-shrink-0 p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">{tip.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">{tip.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{tip.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProTipsPanel;
