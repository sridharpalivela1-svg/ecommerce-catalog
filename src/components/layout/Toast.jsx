import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map(toast => {
        let bgClass = 'bg-slate-900 text-white dark:bg-slate-800 border-slate-700';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
          bgClass = 'bg-slate-900 text-white border-emerald-500/30';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
          bgClass = 'bg-slate-900 text-white border-rose-500/30';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
          bgClass = 'bg-slate-900 text-white border-amber-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-up ${bgClass}`}
          >
            <div className="flex items-center gap-3 pr-2">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
