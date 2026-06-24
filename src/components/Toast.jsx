import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    success: {
      bg: 'bg-emerald-50/95 border-emerald-200/50 text-emerald-800 shadow-emerald-100/50',
      icon: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
    },
    error: {
      bg: 'bg-rose-50/95 border-rose-200/50 text-rose-800 shadow-rose-100/50',
      icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
    },
    info: {
      bg: 'bg-sky-50/95 border-sky-200/50 text-sky-800 shadow-sky-100/50',
      icon: <Info className="w-5 h-5 text-sky-500 shrink-0" />
    }
  };

  const style = typeStyles[type] || typeStyles.success;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className={`fixed top-24 right-6 z-[9999] max-w-sm w-80 sm:w-full flex items-center justify-between gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-premium ${style.bg}`}
    >
      <div className="flex items-center gap-3">
        {style.icon}
        <p className="text-xs font-bold font-sans tracking-wide leading-relaxed text-left">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors border-none bg-transparent cursor-pointer shrink-0"
        aria-label="Close Notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
