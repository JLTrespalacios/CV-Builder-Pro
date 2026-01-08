import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { TRANSLATIONS } from '../../constants/translations';

const ProTipsPanel = () => {
  const { language } = useCVStore();
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      title: t.tipGoogleFormula,
      text: t.tipGoogleFormulaText,
      icon: <Target size={18} className="text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: t.tipActionVerbs,
      text: t.tipActionVerbsText,
      icon: <TrendingUp size={18} className="text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: t.tipQuantify,
      text: t.tipQuantifyText,
      icon: <CheckCircle size={18} className="text-purple-600" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: t.tipATS,
      text: t.tipATSText,
      icon: <Lightbulb size={18} className="text-amber-600" />,
      color: "bg-amber-50 border-amber-200"
    }
  ];

  return (
    <div className="mt-8 border border-amber-200 rounded-lg overflow-hidden bg-amber-50/50 hover-card">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-amber-800 font-semibold">
          <Lightbulb size={20} className="text-amber-600" />
          <span>{t.proTipsTitle}</span>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-amber-600" /> : <ChevronDown size={18} className="text-amber-600" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-3 bg-white">
          {tips.map((tip, index) => (
            <div key={index} className={`p-3 rounded-md border ${tip.color} flex gap-3 items-start hover-list-item`}>
              <div className="mt-0.5 flex-shrink-0">{tip.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{tip.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProTipsPanel;