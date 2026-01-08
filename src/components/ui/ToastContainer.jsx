import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            layout
            className={`pointer-events-auto min-w-[320px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg p-4 flex items-center gap-3 bg-white border border-slate-100 ${
              toast.type === 'success' ? 'border-l-4 border-l-emerald-500' :
              toast.type === 'error' ? 'border-l-4 border-l-red-500' :
              'border-l-4 border-l-blue-500'
            }`}
          >
            {toast.type === 'success' && <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle className="text-emerald-600" size={18} /></div>}
            {toast.type === 'error' && <div className="bg-red-100 p-1 rounded-full"><AlertCircle className="text-red-600" size={18} /></div>}
            {toast.type === 'info' && <div className="bg-blue-100 p-1 rounded-full"><Info className="text-blue-600" size={18} /></div>}
            
            <p className="text-sm text-slate-700 font-medium flex-1">{toast.message}</p>
            
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
