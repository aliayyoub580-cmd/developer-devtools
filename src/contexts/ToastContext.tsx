import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Toast, ToastContextType } from '../types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
    const id = String(++toastId);
    setToasts(prev => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-md shadow-lg animate-slide-in-from-bottom ${
              toast.type === 'success' ? 'bg-success/10 text-success border border-success/20' :
              toast.type === 'error' ? 'bg-error/10 text-error border border-error/20' :
              toast.type === 'warning' ? 'bg-warning/10 text-warning border border-warning/20' :
              'bg-secondary/10 text-secondary border border-secondary/20'
            }`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
